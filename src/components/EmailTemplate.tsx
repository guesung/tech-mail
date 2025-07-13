import { Article } from "@/types";

export default function EmailTemplate({
  targetArticles,
}: {
  targetArticles: Article[];
}) {
  return (
    <div>
      <h2>새 글 알림</h2>
      <ul>
        {targetArticles.map((a) => (
          <li key={a.url}>
            <a href={a.url}>{a.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
