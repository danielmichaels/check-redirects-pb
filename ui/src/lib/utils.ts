export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Constructs the URL with the port if it's not the default HTTP/HTTPS port.
 *
 * @returns The URL as a string, with the port appended if necessary.
 */
export function getUrlWithPort(): string {
  try {
    const url = new URL(window.location.href);
    const isDefaultPort =
      url.port === "" ||
      (url.port === "80" && url.protocol === "http:") ||
      (url.port === "443" && url.protocol === "https:");
    const protocol = url.protocol; // 'http:' or 'https:'
    const hostname = url.hostname;
    const port = isDefaultPort ? "" : `:${url.port}`;

    return `${protocol}//${hostname}${port}`;
  } catch (error) {
    console.error("Error constructing URL with port:", error);
    return "";
  }
}
