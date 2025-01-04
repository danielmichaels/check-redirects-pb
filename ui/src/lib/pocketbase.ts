import PocketBase from "pocketbase";
import { TypedPocketBase } from "./pocketbase-types";
import { getUrlWithPort } from "~/lib/utils";

// @ts-ignore
// During development, the PocketBase server is running on localhost:8090
// and the frontend is running on another port, so we need to specify the host
// But in production, the frontend is served by PocketBase itself, so we can use '/'
//
// 👉 Be sure to keep a trailing / in the baseUrl as its value is used to build
//    other URLs for images and links and those would break if the trailing / is missing
export const POCKETBASE_URL = import.meta.env.PROD
  ? "/"
  : "http://127.0.0.1:8090/";
export const pb = new PocketBase(POCKETBASE_URL) as TypedPocketBase;
