import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "../../../components/ui/checkbox";
import blogs from "@/data/blogs.json";

interface BlogCheckboxItemProps {
  blog: (typeof blogs)[number];
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function BlogCheckboxItem({
  blog,
  checked,
  onCheckedChange,
}: BlogCheckboxItemProps) {
  return (
    <label className="flex items-center gap-2">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        id={blog.name}
      />
      <Image
        src={`/blogs/${blog.logo}`}
        alt={blog.name}
        width={24}
        height={24}
        className="rounded object-contain"
        style={{ minWidth: 24, minHeight: 24 }}
      />
      <Link href={blog.url} target="_blank">
        <span className="text-gray-900">{blog.name}</span>
      </Link>
    </label>
  );
}
