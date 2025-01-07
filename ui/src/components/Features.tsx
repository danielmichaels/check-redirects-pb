import {
  CircleStackIcon,
  EyeIcon,
  ForwardIcon,
  FingerPrintIcon,
  GlobeAsiaAustraliaIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Analyze Every Link in the Chain",
    description:
      "Every single link that you would be sent to is displayed. Get a summary overview, or dive deeper into each hop.",
    icon: FingerPrintIcon,
  },
  {
    name: "Inspect Every Header",
    description:
      "Discover and review headers from every hop. Detect and determine the true nature of the servers along the path.",
    icon: EyeIcon,
  },
  {
    name: "Speed Kills",
    description:
      "Every hop along the path from origin to destination adds latency. Find out where the bottlenecks are.",
    icon: BoltIcon,
  },
  {
    name: "Instant Results",
    description:
      "Get the final destination immediately. Check Redirects is blazingly fast. Cached for fast retrievals.",
    icon: ForwardIcon,
  },
  {
    name: "Determine Jurisdictions",
    description:
      "Each domain's IP is mapped to a physical location letting you visualise where you're really being directed.",
    icon: GlobeAsiaAustraliaIcon,
  },
  {
    name: "Read the Body",
    description:
      "Examine the raw HTML of every link in the chain not just the final response body.",
    icon: CircleStackIcon,
  },
];

export default function Features() {
  return (
    <div id="features" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            All-in-one URL analysis platform
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Gain vital domain intelligence to help detect malicious sites,
            improve page and SEO rankings, increase affiliate marketing revenue
            or bypass ad and DNS privacy restrictions on your local network
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">A better way to send money.</h2>
        <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {features.map((feature) => (
            <div key={feature.name}>
              <dt>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mt-5 text-lg leading-6 font-medium text-gray-900">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
