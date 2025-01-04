import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  HomeIcon,
    TableCellsIcon,
  FolderIcon,
  AtSymbolIcon,
  XMarkIcon as XIcon,
} from '@heroicons/react/24/outline'
import {classNames} from "~/lib/utils";

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: false },
  { name: 'Domain Result', href: '#final-results', icon: AtSymbolIcon, current: false },
  { name: 'Summary Table', href: '#summary-table', icon: TableCellsIcon, current: false },
  { name: 'Link Analysis', href: '#link-analysis', icon: FolderIcon, current: false },
]

export function ResultLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
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
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
              {/* Mobile sidebar content */}
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                    )}
                  >
                    <item.icon className="mr-4 h-6 w-6 flex-shrink-0" aria-hidden="true" />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-1 bg-gray-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon className="mr-3 h-6 w-6 flex-shrink-0" aria-hidden="true" />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/*<div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">*/}
        {/*  <button*/}
        {/*    type="button"*/}
        {/*    className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"*/}
        {/*    onClick={() => setSidebarOpen(true)}*/}
        {/*  >*/}
        {/*    <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />*/}
        {/*  </button>*/}
        {/*  <div className="flex-1 px-4 flex justify-between">*/}
        {/*    <div className="flex-1 flex">*/}
        {/*      /!*<SearchBar />*!/*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">Domain Results</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
