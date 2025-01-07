import { HopsResponse, SearchesResponse } from "~/lib/pocketbase-types";

export interface SocialNavItem {
  name: string;
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export interface IpInfo {
  latitude: string;
  longitude: string;
  [key: string]: string;
}
// export type ExpandedSearchResponse = SearchesResponse & {
//     expand: {
//         hops_via_search_id: HopsResponse[]
//     }
// }

export type ExpandedSearchResponse = SearchesResponse & {
  expand: {
    hops_via_search_id: HopsResponse<unknown, IpInfo>[];
  };
};
