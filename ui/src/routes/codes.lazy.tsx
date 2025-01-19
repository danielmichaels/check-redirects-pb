import { createLazyFileRoute, Link } from "@tanstack/react-router";
import Footer from "~/components/Footer";
import { CodeLayout } from "~/components/CodeLayout";

export const Route = createLazyFileRoute("/codes")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <CodeLayout>
        <div className="relative py-16 bg-gray-50 overflow-hidden">
          <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
            <div
              className="relative h-full text-lg max-w-prose mx-auto"
              aria-hidden="true"
            >
              <svg
                className="absolute top-12 left-full transform translate-x-32"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
                />
              </svg>
              <svg
                className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
                />
              </svg>
              <svg
                className="absolute bottom-12 left-full transform translate-x-32"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="d3eb07ae-5182-43e6-857d-35c643af9034"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
                />
              </svg>
            </div>
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-prose mx-auto">
              <h1>
                <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                  Overview
                </span>
                <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  HTTP response status codes
                </span>
              </h1>
              <p className="mt-8 text-xl text-gray-500 leading-8">
                HTTP response status codes indicate whether a specific HTTP
                request has been successfully completed. Being aware of, and
                having at least passing familiarity of the different classes,
                and common codes is a valuable skill.
              </p>
            </div>
            <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
              <p>Status codes come in five (5) classes</p>
              <ul>
                <li>
                  <span className="text-gray-600 font-bold">1xx</span>{" "}
                  Informational
                </li>
                <li>
                  <span className="text-gray-600 font-bold">2xx</span> Success
                </li>
                <li>
                  <span className="text-gray-600 font-bold">3xx</span>{" "}
                  Redirection
                </li>
                <li>
                  <span className="text-gray-600 font-bold">4xx</span> Client
                  Error
                </li>
                <li>
                  <span className="text-gray-600 font-bold">5xx</span> Server
                  Error
                </li>
              </ul>
              <p></p>
              <h2>Informational Responses</h2>
              <p>
                These indicate a functional webpage and are generally not often
                seen in day to day operations.{" "}
                <Link to="/">Check Redirects </Link>
                is unlikely to show these status responses.
              </p>
              <p>
                Reference:{" "}
                <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#information_responses">
                  Mozilla Developer Network
                </a>
              </p>

              <h2>Successful Responses</h2>
              <p>Indicate that a response has been a success.</p>
              <p>The following are covered in more detail:</p>
              <ul>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "200" }}>
                    200 - OK
                  </Link>
                </li>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "201" }}>
                    201 - Created
                  </Link>
                </li>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "204" }}>
                    204 - No Content
                  </Link>
                </li>
              </ul>
              <h2>Redirection Messages</h2>
              <p>
                Further action is required before reaching the destination.
                These are the most common status codes seen on{" "}
                <Link to="/">Check Redirects</Link>.
              </p>

              <p>The following are covered in more detail:</p>

              <ul>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "301" }}>
                    301 - Moved Permanently
                  </Link>
                </li>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "302" }}>
                    302 - Found
                  </Link>
                </li>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "304" }}>
                    304 - Not Modified
                  </Link>
                </li>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "307" }}>
                    307 - Permanent Redirect
                  </Link>
                </li>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "308" }}>
                    308 - Permanent Redirect
                  </Link>
                </li>
              </ul>

              <h2>Client Error Responses</h2>
              <p>
                Errors associated with the client, usually related to the type
                of data sent in the request.
              </p>

              <p>The following are covered in more detail:</p>

              <ul>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "400" }}>
                    400 - Bad Request
                  </Link>
                </li>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "401" }}>
                    401 - Unauthorized
                  </Link>
                </li>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "403" }}>
                    403 - Forbidden
                  </Link>
                </li>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "404" }}>
                    404 - Not Found
                  </Link>
                </li>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "408" }}>
                    408 - Request Timeout
                  </Link>
                </li>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "410" }}>
                    410 - Gone
                  </Link>
                </li>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "429" }}>
                    429 - Too Many Requests
                  </Link>
                </li>
              </ul>
              <h2>Server Error Responses</h2>
              <p>
                These are initiated by the server and may be a result of a
                request, or could be unrelated.
              </p>

              <p>The following are covered in more detail:</p>

              <ul>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "500" }}>
                    500 - Internal Server Error
                  </Link>
                </li>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "502" }}>
                    502 - Bad Gateway
                  </Link>
                </li>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "502" }}>
                    503 - Service Unavailable
                  </Link>
                </li>
                <li>
                  <Link to="/codes/$codeId" params={{ codeId: "504" }}>
                    504 - Gateway Timeout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CodeLayout>
      <Footer />
    </>
  );
}
