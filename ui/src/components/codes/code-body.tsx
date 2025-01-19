import ReactMarkdown from "react-markdown";

interface CodeBodyProps {
  content: string;
}

export default function CodeBody({ content }: CodeBodyProps) {
  return (
    <>
      <div className="prose prose-slate max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </>
  );
}
