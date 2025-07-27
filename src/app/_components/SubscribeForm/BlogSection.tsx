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

  const handleToggleAll = () => {
    if (allSelected) {
      // Unselect all blogs in this section
      onSelectionChange(
        selectedBlogNames.filter(
          (id) => !blogs.some((blog) => blog.name === id)
        )
      );
    } else {
      // Select all blogs in this section
      const blogNames = blogs.map((blog) => blog.name);
      onSelectionChange([...selectedBlogNames, ...blogNames]);
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
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleToggleAll}
          className="text-sm"
        >
          {allSelected ? "전체 해제" : "전체 선택"}
        </Button>
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
