import { Article } from "@/types";

export default function EmailTemplate({
  targetArticles,
}: {
  targetArticles: Article[];
}) {
  return (
    <div
      style={{
        fontFamily:
          'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#f8fafc",
          padding: "32px 24px",
          textAlign: "center",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <h1
          style={{
            margin: "0 0 8px 0",
            fontSize: "28px",
            fontWeight: "700",
            color: "#1e293b",
            letterSpacing: "-0.025em",
          }}
        >
          📧 Tech Mail
        </h1>
        <p
          style={{
            margin: "0",
            fontSize: "16px",
            color: "#64748b",
            lineHeight: "1.5",
          }}
        >
          새로운 블로그 글을 확인해보세요
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: "32px 24px" }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
          {/* Articles List */}
          {targetArticles.map((article, index) => (
            <div
              key={article.url}
              style={{
                padding: "24px",
                borderBottom:
                  index < targetArticles.length - 1
                    ? "1px solid #f1f5f9"
                    : "none",
                backgroundColor: "#ffffff",
              }}
            >
              {/* Blog Name */}
              <div
                style={{
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#3b82f6",
                    backgroundColor: "#eff6ff",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    display: "inline-block",
                  }}
                >
                  {article.blogName}
                </span>
                {article.author && (
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#64748b",
                    }}
                  >
                    by {article.author}
                  </span>
                )}
              </div>

              {/* Article Title */}
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1e293b",
                  lineHeight: "1.4",
                  wordBreak: "break-word",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <a
                  href={article.url}
                  style={{
                    color: "#1e293b",
                    textDecoration: "none",
                  }}
                >
                  {article.title}
                </a>
              </h3>

              {/* Article Description */}
              {article.description && (
                <p
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "15px",
                    color: "#64748b",
                    lineHeight: "1.5",
                    wordBreak: "break-word",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {article.description}
                </p>
              )}

              {/* Article Meta */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "16px",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    color: "#94a3b8",
                  }}
                >
                  {new Date(article.publishedAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <a
                  href={article.url}
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "500",
                    textDecoration: "none",
                    display: "inline-block",
                    whiteSpace: "nowrap",
                  }}
                >
                  읽으러 가기 →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "32px",
            padding: "24px",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0 0 16px 0",
              fontSize: "14px",
              color: "#64748b",
            }}
          >
            이 이메일은 Tech Mail 서비스에서 발송되었습니다.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://tech-mail.shop"
              style={{
                fontSize: "14px",
                color: "#3b82f6",
                textDecoration: "none",
              }}
            >
              구독 설정
            </a>
            {/* <span style={{ color: "#cbd5e1" }}>|</span> */}
            {/* <a
              href="#"
              style={{
                fontSize: "14px",
                color: "#3b82f6",
                textDecoration: "none",
              }}
            >
              구독 취소
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
