import { Button } from "../../../components/ui/button";
import { BlogCheckboxItem } from "./BlogCheckboxItem";
import blogs from "@/data/blogs.json";

interface BlogSectionProps {
  title: string;
  icon: string;
  blogs: (typeof blogs)[number][];
  selectedBlogNames: string[];
  onSelectionChange: (selectedBlogNames: string[]) => void;
}

export function BlogSection({
  title,
  icon,
  blogs,
  selectedBlogNames,
  onSelectionChange,
}: BlogSectionProps) {
  const allSelected = blogs.every((blog) =>
    selectedBlogNames.includes(blog.name)
  );

  const nekarakubaeBlogs = blogs.filter(
    (blog) => blog.order && blog.order >= 1 && blog.order <= 7
  );

  const allNekarakubaeSelected =
    nekarakubaeBlogs.length > 0 &&
    nekarakubaeBlogs.every((blog) => selectedBlogNames.includes(blog.name));

  const handleToggleAll = () => {
    if (allSelected) {
      onSelectionChange(
        selectedBlogNames.filter(
          (id) => !blogs.some((blog) => blog.name === id)
        )
      );
    } else {
      const blogNames = blogs.map((blog) => blog.name);
      onSelectionChange([...selectedBlogNames, ...blogNames]);
    }
  };

  const handleNekarakubaeToggle = () => {
    if (allNekarakubaeSelected) {
      onSelectionChange(
        selectedBlogNames.filter(
          (id) => !nekarakubaeBlogs.some((blog) => blog.name === id)
        )
      );
    } else {
      const nekarakubaeBlogNames = nekarakubaeBlogs.map((blog) => blog.name);
      onSelectionChange([...selectedBlogNames, ...nekarakubaeBlogNames]);
    }
  };

  const handleBlogToggle = (blogName: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedBlogNames, blogName]);
    } else {
      onSelectionChange(selectedBlogNames.filter((id) => id !== blogName));
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
        {icon} {title}
      </h3>
      <div className="space-y-3">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleToggleAll}
            className="text-sm"
          >
            {allSelected ? "전체 해제" : "전체 선택"}
          </Button>

          {nekarakubaeBlogs.length > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleNekarakubaeToggle}
              className="text-sm"
            >
              {allNekarakubaeSelected
                ? "네카라쿠배당토 해제"
                : "네카라쿠배당토 선택"}
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {blogs.map((blog) => (
            <BlogCheckboxItem
              key={blog.name}
              blog={blog}
              checked={selectedBlogNames.includes(blog.name)}
              onCheckedChange={(checked) =>
                handleBlogToggle(blog.name, checked)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
