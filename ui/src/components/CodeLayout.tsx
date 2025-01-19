import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckBadgeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  GlobeAsiaAustraliaIcon,
  HomeIcon,
  ServerIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";
import { classNames } from "~/lib/utils";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: false },
  {
    name: "Status Code Overview",
    href: "/codes",
    icon: GlobeAsiaAustraliaIcon,
    current: false,
  },
  {
    name: "200 - OK",
    href: "/codes/200",
    icon: CheckCircleIcon,
    current: false,
  },
  {
    name: "201 - Created",
    href: "/codes/201",
    icon: CheckCircleIcon,
    current: false,
  },
  {
    name: "204 - No Content",
    href: "/codes/204",
    icon: CheckCircleIcon,
    current: false,
  },
  {
    name: "301 - Moved Permanently",
    href: "/codes/301",
    icon: ExclamationCircleIcon,
    current: false,
  },
  {
    name: "302 - Found",
    href: "/codes/302",
    icon: ExclamationCircleIcon,
    current: false,
  },
  {
    name: "304 - Not Modified",
    href: "/codes/304",
    icon: ExclamationCircleIcon,
    current: false,
  },
  {
    name: "307 - Temporary Redirect",
    href: "/codes/307",
    icon: ExclamationCircleIcon,
    current: false,
  },
  {
    name: "308 - Permanent Redirect",
    href: "/codes/308",
    icon: ExclamationCircleIcon,
    current: false,
  },
  {
    name: "400 - Bad Request",
    href: "/codes/400",
    icon: CheckBadgeIcon,
    current: false,
  },
  {
    name: "401 - Unauthorized",
    href: "/codes/401",
    icon: CheckBadgeIcon,
    current: false,
  },
  {
    name: "403 - Forbidden",
    href: "/codes/403",
    icon: CheckBadgeIcon,
    current: false,
  },
  {
    name: "404 - Not Found",
    href: "/codes/404",
    icon: CheckBadgeIcon,
    current: false,
  },
  {
    name: "408 - Request Timeout",
    href: "/codes/408",
    icon: CheckBadgeIcon,
    current: false,
  },
  {
    name: "410 - Gone",
    href: "/codes/410",
    icon: CheckBadgeIcon,
    current: false,
  },
  {
    name: "429 - Too Many Requests",
    href: "/codes/429",
    icon: CheckBadgeIcon,
    current: false,
  },
  {
    name: "500 - Internal Server Error",
    href: "/codes/500",
    icon: ServerIcon,
    current: false,
  },
  {
    name: "502 - Bad Gateway",
    href: "/codes/502",
    icon: ServerIcon,
    current: false,
  },
  {
    name: "503 - Service Unavailable",
    href: "/codes/503",
    icon: ServerIcon,
    current: false,
  },
  {
    name: "504 - Gateway Timeout",
    href: "/codes/504",
    icon: ServerIcon,
    current: false,
  },
];

export function CodeLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <Transition show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            open={sidebarOpen}
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <Link to="/">
                    <img
                      className="h-8 w-auto"
                      src="/icons/apple-touch-icon.png"
                      alt="Check Redirects"
                    />
                  </Link>
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md",
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-300"
                              : "text-gray-400 group-hover:text-gray-300",
                            "mr-4 flex-shrink-0 h-6 w-6",
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col h-0 flex-1">
              <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-800">
                <Link to="/">
                  <img
                    className="h-8 w-auto"
                    src="/icons/apple-touch-icon.png"
                    alt="Check Redirects"
                  />
                </Link>
              </div>
              <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-gray-300"
                            : "text-gray-400 group-hover:text-gray-300",
                          "mr-3 flex-shrink-0 h-6 w-6",
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
