import ReactMarkdown from "react-markdown";

interface CodeBodyProps {
  content: string;
}

export default function CodeBody({ content }: CodeBodyProps) {
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="prose">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}
