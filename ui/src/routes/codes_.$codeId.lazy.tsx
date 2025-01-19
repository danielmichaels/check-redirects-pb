import { createLazyFileRoute } from "@tanstack/react-router";
import { CodeLayout } from "~/components/CodeLayout";
import CodeHeader from "~/components/codes/code-header";
import CodeBody from "~/components/codes/code-body";
import { getPostBySlug } from "~/lib/markdown-api";

interface Post {
  title: string;
  code_type: string;
  slug: string;
  content: string;
}

export const Route = createLazyFileRoute("/codes_/$codeId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { codeId } = Route.useParams();

  try {
    const post = getPostBySlug(codeId, [
      "title",
      "code_type",
      "slug",
      "content",
    ]) as Post;

    return (
      <CodeLayout>
        <CodeHeader title={post.title} code_type={post.code_type} />
        <CodeBody content={post.content} />
      </CodeLayout>
    );
  } catch (error) {
    console.error(error);
    return <div>Status code {codeId} not found</div>;
  }
}
