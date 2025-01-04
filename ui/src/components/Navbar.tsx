import {Disclosure} from '@headlessui/react'
import {Link, useNavigate} from "@tanstack/react-router";
import {classNames} from "~/lib/utils";

const navigation = [
  {name: '', href: '#', current: false},
  // {name: 'Pricing', href: '/#pricing', current: false},
  // {name: 'Docs', href: '/docs', current: false},
]
const userActions = [
  {name: 'About', href: '/about', current: false},
  {name: 'Status Codes', href: '/codes', current: false},
]

export default function Navbar() {
  const navigate = useNavigate()
  return (
    // <Disclosure as="nav" className="bg-gray-800">
    <Disclosure as="nav" className="bg-gray-50">
      {({open}) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div
                className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                    <img
                      onClick={() => navigate({to: "/"})}
                      className="hidden lg:block h-8 w-auto focus hover:opacity-40"
                      src="/icons/apple-touch-icon.png"
                      alt="Check Redirects Logo"
                      title="Home"
                    />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {userActions.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-indigo-600 font-bold hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
