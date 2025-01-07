import {
  ArrowDownCircleIcon as ArrowCircleDownIcon,
  CheckCircleIcon,
  GlobeAsiaAustraliaIcon,
} from "@heroicons/react/24/outline";
import { HopsRecord } from "~/lib/pocketbase-types";

export function SummaryTable({ hops }: { hops: HopsRecord[] }) {
  return (
    <div id="summary-table" className="mt-5">
      <h2 className="text-xl font-bold text-gray-900 my-3 mx-auto">
        Summary Table
      </h2>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Hop
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Scheme
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Latency
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Path
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Link</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {hops.map((hop) => (
                  <tr key={hop.hop_number}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <p className="text-sm font-medium text-indigo-600 truncate">
                            Hop
                          </p>
                          <div className="font-medium text-gray-500 text-center text-lg">
                            {hop.hop_number}
                          </div>
                        </div>
                        <div className="ml-4">
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
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm text-gray-900">
                          {hop.status_phrase}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          {hop.status_code !== 200 ? (
                            <ArrowCircleDownIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-400"
                              aria-hidden="true"
                            />
                          ) : (
                            <CheckCircleIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                              aria-hidden="true"
                            />
                          )}
                          {hop.status_code}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          hop.scheme === "https"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {hop.scheme}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {hop.time_elapsed}ms
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {hop.path}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href={hop.url}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Link
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
