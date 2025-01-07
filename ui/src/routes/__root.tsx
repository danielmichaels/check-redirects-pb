import { createRootRoute, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NotFound404 from "~/components/NotFound404";
import { Toaster } from "sonner";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

export const Route = createRootRoute({
  notFoundComponent: NotFound404,
  errorComponent: () => (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Something went wrong
        </h1>
        <p className="mt-2 text-gray-600">Please try again later</p>
      </div>
    </div>
  ),
  component: () => (
    <>
      <div className="min-h-screen flex flex-col">
        <Toaster position="top-right" richColors />
        <Outlet />
        <Suspense>
          <TanStackRouterDevtools position="bottom-left" />
          <ReactQueryDevtools buttonPosition="bottom-right" />
        </Suspense>
      </div>
    </>
  ),
});
