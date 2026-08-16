import type { ReactElement, SVGProps } from "react";
import { HopsResponse, SearchesResponse } from "~/lib/pocketbase-types";

export interface SocialNavItem {
  name: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
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
