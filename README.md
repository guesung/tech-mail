# Tech Mail : 기술 블로그 메일 구독 서비스

<div align='center'>
   <h1>Tech Mail</h1>
   <p>관심 있는 기술 블로그의 새 글을 매일 아침 이메일로 받아보세요.</p>
   <div>
      <img width="728" height="993" alt="image" src="https://github.com/user-attachments/assets/401c4084-caf4-4aea-9888-f021e2ac35b9" />
   </div>
   <br />
</div>

### 🤔 개발 배경

- 여러 기업/개발자 블로그를 찾아다니며 새 글을 확인하는 반복 작업이 번거로웠습니다.
- RSS를 지원하는 블로그가 많지만, 사용자 입장에선 “나에게 필요한 글만 묶어서 한 번에 받아보기”가 어렵습니다.
- 이메일은 가장 보편적이고 도달률이 높은 채널입니다. 구독자가 고른 블로그의 새 글만 매일 아침 묶어서 보내는 간단·확실한 경험을 목표로 했습니다.

---

### 📝 주요 기능

1. **블로그 선택 구독**
   - `src/data/blogs.json`에 정의된 다양한 기술 블로그 중 원하는 블로그만 선택해 구독
2. **일간 RSS 수집 및 필터링**
   - 매일 RSS를 크롤링해 KST(한국 표준시) 기준 “오늘 올라온 글”만 추려냄
3. **이메일 발송**
   - 선택한 블로그의 오늘자 글만 모아 HTML 템플릿로 이메일 발송
4. **간단한 구독 UI**
   - 메인 페이지에서 블로그 선택 + 이메일 입력만으로 구독 완료

---

### 🏗️ 아키텍처 개요

- **Frontend**: Next.js(App Router), React 19, Tailwind CSS
- **Backend**: Next.js API Route
- **DB**: Supabase(PostgreSQL)
- **Cron**: Vercel Cron
- **Email**: Resend
- **RSS**: rss-parser

#### 데이터 흐름

- 사용자는 `SubscribeForm`에서 이메일과 구독할 블로그를 제출
- 구독 정보는 Supabase의 `subscribers` 테이블에 저장
- Vercel Cron이 매일 정해진 시간에 `/api/cron/check-rss` 실행
- RSS 크롤링 후 금일 게시글만 필터 → 구독자별 관심 블로그에 맞게 매칭 → 이메일 발송

---

### 🔩 핵심 구현 위치

- 구독 폼: `src/app/_components/SubscribeForm/index.tsx`
  - Supabase upsert로 `subscribers`에 이메일/선택 블로그 저장
- RSS 크롤링: `src/app/api/cron/check-rss/_utils/articles.ts`
  - `rss-parser`로 피드 수집 → 금일 게시물만 필터(KST 기준)
- 이메일 발송: `src/lib/email.ts`, 템플릿 `src/app/api/cron/check-rss/_components/EmailTemplate.tsx`
- Cron 엔드포인트: `src/app/api/cron/check-rss/route.ts` (GET)

---

### ⏰ 스케줄(Cron)

`vercel.json`

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "crons": [{ "path": "/api/cron/check-rss", "schedule": "0 22 * * *" }]
}
```

- 매일 22:00 UTC 실행 (KST 기준 익일 오전 7시)

로컬에서 수동 실행(개발 중 확인 용도):

- 브라우저/HTTP 클라이언트로 `GET http://localhost:3000/api/cron/check-rss`

---

### ⚙️ 환경 변수

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Email (Resend)
NEXT_PUBLIC_RESEND_API_KEY=
NEXT_PUBLIC_FROM_EMAIL=  # 발신 주소

# App
NEXT_PUBLIC_APP_URL=     # (선택) 도메인 기반 링크 생성 시 사용
```

---

### 🧑‍💻 로컬 개발

```bash
# 1) 의존성 설치
npm install

# 2) .env 설정
cp .env.example .env   # (파일이 있다면)

# 3) 개발 서버
npm run dev
# http://localhost:3000
```

- 블로그 데이터 정합성 체크:

```bash
npm run validate-blogs
```

---

### 🚀 배포

- Vercel에 프로젝트 연결
- 환경 변수 설정
- `vercel.json`의 Cron 스케줄 활성화
- 배포 후 `/api/cron/check-rss`가 일정에 맞춰 실행

---

### 👀 UI 개요

- `src/app/page.tsx`: 심플한 구독 폼 중심
- `src/app/introduce/page.tsx`: 기능 소개/FAQ/그리드 등 랜딩 구성
