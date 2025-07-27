import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Parser from "rss-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 블로그 데이터 로드
const blogsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/blogs.json"), "utf8")
);

// 결과 저장할 디렉토리 생성
const resultsDir = path.join(__dirname, "../results");
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

// URL 상태 확인 함수
async function checkUrl(url, timeout = 10000) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; TechMailBot/1.0)",
      },
    });

    clearTimeout(timeoutId);
    return {
      status: response.status,
      ok: response.ok,
      statusText: response.statusText,
    };
  } catch (error) {
    return {
      status: 0,
      ok: false,
      statusText: error.message,
    };
  }
}

// RSS 피드 검증 함수
async function validateRssFeed(rssUrl, timeout = 15000) {
  if (!rssUrl || rssUrl.trim() === "") {
    return {
      valid: false,
      error: "RSS URL이 비어있습니다.",
      items: [],
    };
  }

  try {
    const parser = new Parser({
      headers: {
        Accept:
          "application/rss+xml, application/atom+xml, application/xml, text/xml",
        "User-Agent": "Mozilla/5.0 (compatible; TechMailBot/1.0)",
      },
      timeout: timeout,
    });

    const feed = await parser.parseURL(rssUrl);

    return {
      valid: true,
      error: null,
      items: feed.items || [],
      feedTitle: feed.title,
      feedDescription: feed.description,
      itemCount: (feed.items || []).length,
    };
  } catch (error) {
    return {
      valid: false,
      error: error.message,
      items: [],
    };
  }
}

// 메인 검증 함수
async function validateBlogs() {
  console.log("🔍 블로그 URL 및 RSS 피드 검증을 시작합니다...");

  const results = {
    timestamp: new Date().toISOString(),
    total: blogsData.length,
    valid: 0,
    invalid: 0,
    details: [],
  };

  // 병렬 처리를 위한 배치 크기 설정
  const BATCH_SIZE = 10;
  const batches = [];

  for (let i = 0; i < blogsData.length; i += BATCH_SIZE) {
    batches.push(blogsData.slice(i, i + BATCH_SIZE));
  }

  let processedCount = 0;

  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    console.log(
      `\n📦 배치 ${batchIndex + 1}/${batches.length} 처리 중... (${batch.length}개)`
    );

    // 배치 내에서 병렬 처리
    const batchPromises = batch.map(async (blog, index) => {
      const globalIndex = processedCount + index;
      console.log(
        `[${globalIndex + 1}/${blogsData.length}] 검증 중: ${blog.name}`
      );

      const result = {
        name: blog.name,
        url: blog.url,
        rssUrl: blog.rssUrl,
        show: blog.show,
        company: blog.company,
        urlCheck: null,
        rssCheck: null,
      };

      // URL과 RSS URL을 동시에 검증
      const [urlCheck, rssCheck] = await Promise.allSettled([
        blog.url ? checkUrl(blog.url) : Promise.resolve(null),
        blog.rssUrl ? validateRssFeed(blog.rssUrl) : Promise.resolve(null),
      ]);

      result.urlCheck =
        urlCheck.status === "fulfilled"
          ? urlCheck.value
          : {
              status: 0,
              ok: false,
              statusText: urlCheck.reason?.message || "Unknown error",
            };

      result.rssCheck =
        rssCheck.status === "fulfilled"
          ? rssCheck.value
          : {
              valid: false,
              error: rssCheck.reason?.message || "Unknown error",
              items: [],
            };

      return result;
    });

    // 배치 완료 대기
    const batchResults = await Promise.all(batchPromises);

    // 결과 분류 및 집계
    batchResults.forEach((result) => {
      const urlValid = result.urlCheck?.ok || !result.url;
      const rssValid = result.rssCheck?.valid || !result.rssUrl;

      if (urlValid && rssValid) {
        results.valid++;
      } else {
        results.invalid++;
      }

      results.details.push(result);
    });

    processedCount += batch.length;
    console.log(
      `✅ 배치 ${batchIndex + 1} 완료 - 진행률: ${processedCount}/${blogsData.length} (${Math.round(
        (processedCount / blogsData.length) * 100
      )}%)`
    );
  }

  return results;
}

// 결과를 파일로 저장
function saveResults(results) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `blog-validation-${timestamp}.json`;
  const filepath = path.join(resultsDir, filename);

  fs.writeFileSync(filepath, JSON.stringify(results, null, 2), "utf8");

  console.log(`\n📊 검증 결과가 저장되었습니다: ${filepath}`);

  // 요약 리포트 생성
  const summary = {
    timestamp: results.timestamp,
    total: results.total,
    valid: results.valid,
    invalid: results.invalid,
    successRate: Math.round((results.valid / results.total) * 100),
    issues: results.details
      .filter((d) => {
        const urlValid = d.urlCheck?.ok || !d.url;
        const rssValid = d.rssCheck?.valid || !d.rssUrl;
        return !urlValid || !rssValid;
      })
      .map((d) => ({
        name: d.name,
        url: d.url,
        rssUrl: d.rssUrl,
        urlStatus: d.urlCheck?.status || "N/A",
        rssError: d.rssCheck?.error || "N/A",
      })),
  };

  const summaryFilename = `blog-validation-summary-${timestamp}.json`;
  const summaryFilepath = path.join(resultsDir, summaryFilename);
  fs.writeFileSync(summaryFilepath, JSON.stringify(summary, null, 2), "utf8");

  console.log(`📋 요약 리포트가 저장되었습니다: ${summaryFilepath}`);

  return { filepath, summaryFilepath };
}

// 메인 실행
async function main() {
  try {
    const results = await validateBlogs();
    saveResults(results);

    console.log("\n🎯 검증 완료!");
    console.log(`✅ 유효한 블로그: ${results.valid}개`);
    console.log(`❌ 문제가 있는 블로그: ${results.invalid}개`);
    console.log(
      `📈 성공률: ${Math.round((results.valid / results.total) * 100)}%`
    );

    if (results.invalid > 0) {
      console.log("\n⚠️  문제가 있는 블로그들:");
      results.details
        .filter((d) => {
          const urlValid = d.urlCheck?.ok || !d.url;
          const rssValid = d.rssCheck?.valid || !d.rssUrl;
          return !urlValid || !rssValid;
        })
        .forEach((d) => {
          console.log(`  - ${d.name}`);
          if (!d.urlCheck?.ok)
            console.log(`    URL 오류: ${d.urlCheck?.statusText}`);
          if (!d.rssCheck?.valid)
            console.log(`    RSS 오류: ${d.rssCheck?.error}`);
        });
    }
  } catch (error) {
    console.error("❌ 검증 중 오류가 발생했습니다:", error);
    process.exit(1);
  }
}

// 스크립트가 직접 실행될 때만 main 함수 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { validateBlogs, saveResults };
