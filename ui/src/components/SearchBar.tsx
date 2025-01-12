import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { POCKETBASE_URL } from "~/lib/pocketbase";

const examples = [
  {
    id: 1,
    name: "New York Times Shortened URL",
    url: "http://nyti.ms/1QETHgV",
    user_agent: "firefox",
  },
  {
    id: 2,
    name: "A Random Wikipedia Article",
    url: "https://en.wikipedia.org/wiki/Special:Random",
    user_agent: "firefox",
  },
  {
    id: 3,
    name: "A short link to my blog",
    url: "https://tars.run/XwsxjYVI32g",
    user_agent: "firefox",
  },
];

export default function SearchBar() {
  const [url, setUrl] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (urlToCheck: string) => {
      const response = await fetch(`${POCKETBASE_URL}api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: urlToCheck,
          user_agent: "chrome",
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      return response.json();
    },
    onSuccess: (data) => {
      navigate({
        to: "/results/$resultId",
        params: {
          resultId: data.id,
        },
      });
      setErrorMessage(null);
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
      toast.error(`Search failed: ${error.message || "Network error"}`);
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    setIsSearching(true);
    e.preventDefault();
    setErrorMessage(null);
    if (url) {
      mutation.mutate(url);
    }
  };
  const handleExampleClick = (exampleUrl: string) => {
    setIsSearching(true);
    mutation.mutate(exampleUrl);
  };

  return (
    <div className=" bg-gray-50 flex flex-col justify-center py-6 sm:px-3 lg:px-6">
      <div className="mt-4 sm:w-full lg:w-2/3 xl:w-1/3 md:mx-auto">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700"
              >
                Search
              </label>
              <div className="mt-1">
                <input
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Enter a URL here"
                  autoComplete="search"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  disabled={isSearching}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            {errorMessage && (
              <div className="text-red-500 mb-1 text-center">
                {errorMessage}
              </div>
            )}
            <div className="pt-0">
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className=" justify-center py-2 px-5 w-full lg:w-1/3 md:w-3/4 xl:w-1/2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSearching ? "Searching" : "Search"}
                </button>
              </div>
            </div>
          </form>

          <div className="pt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or try these out to see how it works
                </span>
              </div>
            </div>
            {examples.map((example) => (
              <div key={example.id}>
                <div className="mt-3 flex-auto flex-row md:flex-1">
                  <div>
                    <button
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      type="button"
                      onClick={() => {
                        handleExampleClick(example.url);
                      }}
                    >
                      {example.name}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
