import { Link } from "@tanstack/react-router";

interface CodeHeaderProps {
  title: string;
  code_type: string;
}
// @ts-ignore
export default function CodeHeader({ title, code_type }: CodeHeaderProps) {
  return (
    <>
      <div className="">
        <div className="max-w-xl my-5 mx-auto text-xl text-gray-500">
          <p className="text-left uppercase text-xs text-indigo-600 font-bold hover:underline">
            <Link to="/codes">👈 Status Code List</Link>
          </p>
          <p className="my-2 text-md font-medium text-gray-400 sm:text-md">
            {code_type}
          </p>
          <p
            className="mt-1 text-lg font-bold text-gray-900 sm:text-lg
              sm:tracking-tight lg:text-3xl"
          >
            {title}
          </p>
          <div className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            <div className="text-left text-xs uppercase font-bold text-gray-500"></div>
          </div>
        </div>
      </div>
    </>
  );
}
