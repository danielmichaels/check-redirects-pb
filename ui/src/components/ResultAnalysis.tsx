import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  GlobeAsiaAustraliaIcon,
} from "@heroicons/react/24/outline";
import { HopsRecord, HopsResponse } from "~/lib/pocketbase-types";
import { classNames } from "~/lib/utils";
import IpGeoVisualization from "~/components/IpGeoVisualisation";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import html from "react-syntax-highlighter/dist/esm/languages/hljs/xml";
import atomOneDark from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark";
import { useState } from "react";
import { IpInfo } from "~/lib/types";
// Register the HTML language
SyntaxHighlighter.registerLanguage("html", html);

const tabs = [
  { name: "IP Info", href: "ip-info", current: true },
  { name: "Map", href: "map", current: false },
  { name: "Headers", href: "headers", current: false },
];

export function ResultAnalysis({
  hops,
}: {
  hops: HopsResponse<unknown, IpInfo>[];
}) {
  const [isBodyOpen, setIsBodyOpen] = useState(false);
  const [selectedBody, setSelectedBody] = useState<string | undefined>("");

  return (
    <div id="link-analysis" className="mt-5">
      <h2 className="text-xl font-bold text-gray-900 my-3 mx-auto">
        Link Analysis
      </h2>
      <div className="mt-5 bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {hops.map((hop) => (
            <li key={hop.hop_number}>
              <Disclosure as="div" className="block hover:bg-gray-50">
                {({ open }) => (
                  <>
                    <div className="flex items-center px-4 py-4 sm:px-6">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                          <p className="text-sm font-medium text-indigo-600 truncate">
                            Hop
                          </p>
                          <div className="font-medium text-gray-500 text-center text-lg">
                            {hop.hop_number}
                          </div>
                        </div>
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <p className="text-sm font-medium text-indigo-600 truncate">
                              {hop.ipaddr}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <GlobeAsiaAustraliaIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="truncate">{hop.host}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:block">
                        <DisclosureButton className="-ml-px relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                          Domain Details
                          <ChevronDownIcon
                            className={classNames(
                              open ? "-rotate-180" : "rotate-0",
                              "h-5 w-5 transform",
                            )}
                            aria-hidden="true"
                          />
                        </DisclosureButton>
                      </div>
                      <div className="sm:hidden">
                        <DisclosureButton className="-ml-px relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                          <ChevronDownIcon
                            className={classNames(
                              open ? "-rotate-180" : "rotate-0",
                              "h-5 w-5 transform",
                            )}
                            aria-hidden="true"
                          />
                        </DisclosureButton>
                      </div>
                    </div>

                    <DisclosurePanel>
                      <div>
                        <nav
                          className="mx-4 relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
                          aria-label="Tabs"
                        >
                          {tabs.map((tab) => (
                            <a
                              key={`${tab.name}-${hop.id}`}
                              href={`#${tab.href}-${hop.id}`}
                              className="group relative min-w-0 flex-1 overflow-hidden bg-indigo-100 py-4 px-4 text-sm font-medium text-center hover:bg-indigo-200 text-indigo-700 focus:z-10"
                            >
                              <span>{tab.name}</span>
                              <span
                                aria-hidden="true"
                                className="absolute inset-x-0 bg-indigo-500"
                              />
                            </a>
                          ))}
                          <button
                            id={`body-${hop.id}`}
                            className="group relative min-w-0 flex-1 overflow-hidden bg-indigo-100 py-4 px-4 text-sm font-medium text-center hover:bg-indigo-200 text-indigo-700 focus:z-10"
                            onClick={() => {
                              setSelectedBody(hop.body);
                              setIsBodyOpen(true);
                            }}
                          >
                            Body
                          </button>
                          <a
                            href={`https://shodan.io/host/${hop.ipaddr}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            id={`shodan-${hop.id}`}
                            className="hidden lg:block group relative min-w-0 flex-1 overflow-hidden bg-indigo-100 py-4 px-4 text-sm font-medium text-center hover:bg-indigo-200 text-indigo-700 focus:z-10"
                          >
                            Shodan
                          </a>
                        </nav>
                      </div>

                      <div
                        id={`ip-info-${hop.id}`}
                        className="grid grid-cols-1 mx-auto xl:grid-cols-4 lg:grid-cols-4"
                      >
                        <div className="xl:col-span-2 lg:col-span-2">
                          <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg text-indigo-500 my-3 mx-auto">
                              IP Address Information
                            </h3>
                            <ul className="divide-y divide-gray-200">
                              {hop.ipinfo &&
                                Object.entries(hop.ipinfo).map(
                                  ([key, value], index) => (
                                    <li
                                      key={index}
                                      className={classNames(
                                        value ? "" : "hidden",
                                        "py-1",
                                      )}
                                    >
                                      <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                                        <h3 className="text-sm font-semibold text-gray-800">
                                          <p className="text-sm text-gray-600 capitalize">
                                            {key}:
                                          </p>
                                        </h3>
                                        <p className="mt-0 text-sm text-gray-600 line-clamp-2">
                                          {value}
                                        </p>
                                      </div>
                                    </li>
                                  ),
                                )}
                            </ul>
                          </div>
                        </div>

                        <div
                          id={`map-${hop.id}`}
                          className="xl:col-span-2 lg:col-span-2"
                        >
                          <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg text-indigo-500 my-3 mx-auto">
                              Server IP Geolocation
                            </h3>
                            {hop.ipinfo && (
                              <IpGeoVisualization
                                  loc={hop.ipinfo.loc}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className="px-4 py-5 sm:p-6"
                        id={`headers-${hop.id}`}
                      >
                        <h3 className="text-lg text-indigo-500 my-3 mx-auto">
                          Headers
                        </h3>
                        <ul className="divide-y divide-gray-200">
                          {Object.entries(
                            hop.headers as Record<string, unknown>,
                          ).map(([key, value], index) => (
                            <li
                              key={index}
                              className={classNames(
                                value ? "" : "hidden",
                                "py-1",
                              )}
                            >
                              <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                                <h3 className="text-sm font-semibold text-gray-800">
                                  <p className="text-sm text-gray-600 capitalize">
                                    {key}:
                                  </p>
                                </h3>
                                <p className="mt-0 text-sm text-gray-600 line-clamp-2">
                                  {String(value)}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            </li>
          ))}
        </ul>
      </div>
      {/*  Open the body */}
      <Dialog
        open={isBodyOpen}
        onClose={() => setIsBodyOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
            <DialogTitle className="text-lg font-medium text-white mb-4">
              HTML Body
            </DialogTitle>
            <div className="max-h-[70vh] overflow-auto">
              <SyntaxHighlighter
                language="html"
                style={atomOneDark}
                customStyle={{
                  padding: "20px",
                  borderRadius: "8px",
                  margin: 0,
                }}
              >
                {selectedBody || ""}
              </SyntaxHighlighter>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
