export interface BlogInfo {
  name: string;
  rssUrl: string;
  websiteUrl?: string;
}

export const BLOGS: BlogInfo[] = [
  { name: "무신사", rssUrl: "https://medium.com/feed/musinsa-tech" },
  { name: "네이버 D2", rssUrl: "https://d2.naver.com/d2.atom" },
  { name: "마켓컬리", rssUrl: "https://helloworld.kurly.com/feed.xml" },
  { name: "우아한형제들", rssUrl: "https://techblog.woowahan.com/feed/" },
  {
    name: "카카오엔터프라이즈",
    rssUrl: "https://tech.kakaoenterprise.com/feed",
  },
  { name: "데브시스터즈", rssUrl: "https://tech.devsisters.com/rss.xml" },
  {
    name: "라인",
    rssUrl: "https://engineering.linecorp.com/ko/feed/index.html",
  },
  { name: "당근마켓", rssUrl: "https://medium.com/feed/daangn" },
  { name: "토스", rssUrl: "https://toss.tech/rss.xml" },
  { name: "직방", rssUrl: "https://medium.com/feed/zigbang" },
  { name: "WATCHA", rssUrl: "https://medium.com/feed/watcha" },
  { name: "뱅크샐러드", rssUrl: "https://blog.banksalad.com/rss.xml" },
  { name: "Hyperconnect", rssUrl: "https://hyperconnect.github.io/feed.xml" },
  { name: "쏘카", rssUrl: "https://tech.socarcorp.kr/feed" },
  { name: "리디", rssUrl: "https://www.ridicorp.com/feed" },
  { name: "NHN Cloud", rssUrl: "https://meetup.toast.com/rss" },
  { name: "넷마블", rssUrl: "https://netmarble.engineering/feed/" },
  { name: "Dable", rssUrl: "https://teamdable.github.io/techblog/feed.xml" },
  { name: "카카오", rssUrl: "https://tech.kakao.com/feed/" },
  { name: "티빙", rssUrl: "https://medium.com/feed/tving-team" },
  { name: "드라마앤컴퍼니", rssUrl: "https://blog.dramancompany.com/feed/" },
  { name: "지마켓", rssUrl: "https://ebay-korea.tistory.com/rss" },
  { name: "elecle", rssUrl: "http://medium.com/feed/elecle-bike" },
  { name: "리눅서", rssUrl: "https://linuxer.name/feed/" },
  { name: "Outsider", rssUrl: "http://feeds2.feedburner.com/rss_outsider_dev" },
  { name: "향로", rssUrl: "https://jojoldu.tistory.com/rss" },
  { name: "Marcin Cuber", rssUrl: "https://medium.com/feed/@marcincuber" },
];
