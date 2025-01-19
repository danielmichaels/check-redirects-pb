import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { CameraIcon } from "@heroicons/react/24/outline";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 overflow-hidden">
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />
          <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
            <div>
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                About 👋
              </h2>
              <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Hey I’m Dan and I created Check Redirects
              </h3>
            </div>
          </div>
          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="relative lg:row-start-1 lg:col-start-2">
              <svg
                className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="de316486-4a29-4312-bdfc-fbce2132a2c1"
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
                  fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
                />
              </svg>
              <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                <figure>
                  <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                    <img
                      className="rounded-lg shadow-lg object-cover object-center"
                      src="/img/dan-walking.jpg"
                      alt="Dan walking his beautiful dog, Finn"
                      width={1184}
                      height={1376}
                    />
                  </div>
                  <figcaption className="mt-3 flex text-sm text-gray-500">
                    <CameraIcon
                      className="flex-none w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-2">
                      Australia, Dan and Finn the dog
                    </span>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="text-base max-w-prose mx-auto lg:max-w-none">
                <p className="text-lg text-gray-500">
                  I’m also the designer, engineer, marketing guru and customer
                  support.
                </p>
              </div>
              <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                <p>
                  Networking and computer security have always fascinated me. I
                  created <Link to="/">Check Redirects</Link> to explore this
                  passion while solving real problems. While advertising
                  networks serve their purpose, I recognize the potential
                  security risks they can pose.
                </p>
                <p>
                  This platform was born from practical needs. In networks I
                  manage, I implement robust DNS and firewall security measures.
                  However, this can sometimes impact usability. Check Redirects
                  bridges this gap by allowing both me and you to safely handle
                  redirects - whether from private networks or cloud providers.
                  Now, instead of blindly clicking through Amazon affiliate or
                  bit.ly links within a LAN, you can instantly see their final
                  destination.
                </p>
                <p>
                  Beyond security, tracking URL redirect chains proves valuable
                  for many tasks. It's particularly useful for analyzing
                  affiliate links and mapping IP address locations throughout
                  the redirection sequence. For questions, feedback, or
                  suggestions, reach out to me.
                </p>

                <p>
                  Cheers from Australia,
                  <span>
                    <br />
                  </span>
                  <a
                    href="https://twitter.com/dansult"
                    className="text-gray-700"
                  >
                    Dan
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
