import matter from "gray-matter";

interface Post {
  slug: string;
  title: string;
  code_type: string;
  content: string;
}

// @ts-ignore
const posts = import.meta.glob("/src/content/status_codes/_codes/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export function getPostBySlug(
  slug: string,
  fields: string[] = [],
): Partial<Post> {
  const key = Object.keys(posts).find((path) => path.includes(`${slug}.md`));
  if (!key) return {};

  const markdownContent = posts[key];
  const frontMatterRegex = /---\n([\s\S]*?)\n---/;
  const match = markdownContent.match(frontMatterRegex);

  const frontMatter = match
    ? match[1].split("\n").reduce(
        (acc, line) => {
          const [key, value] = line.split(": ");
          if (key && value) {
            acc[key.trim()] = value.replace(/['"]/g, "").trim();
          }
          return acc;
        },
        {} as Record<string, string>,
      )
    : {};

  const content = markdownContent.replace(frontMatterRegex, "").trim();

  const items: Partial<Post> = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (field in frontMatter) {
      items[field as keyof Post] = frontMatter[field];
    }
  });

  return items;
}
