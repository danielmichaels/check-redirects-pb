import { Link } from '@tanstack/react-router'
import {SearchesResponse} from "~/lib/pocketbase-types";

export function FinalResult({ resultArray }: SearchesResponse) {
  if (resultArray.length === 0) return null

  const link = resultArray.final_url
  const totalRedirects = resultArray.total_hops
  const stats = [
    { label: 'Total Hops', value: totalRedirects },
  ]

  return (
    <section id="final-results" aria-labelledby="final-results">
      <div className="rounded-lg bg-white overflow-hidden shadow">
        <h2 className="sr-only" id="final-results">Results</h2>
        <div className="bg-white p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{resultArray.final_url}</p>
                <p className="text-sm font-medium text-gray-600">Domain Result</p>
                <p className="mt-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Link to={link}>{link}</Link>
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <Link to={link}>
                <button
                  type="button"
                  className="break-word inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Click to Visit URL
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          {stats.map((stat) => (
            <div key={stat.label} className="px-6 py-5 text-sm font-medium text-center">
              <span className="text-gray-900">{stat.value}</span>{' '}
              <span className="text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
