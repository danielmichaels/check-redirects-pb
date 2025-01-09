import { createLazyFileRoute } from "@tanstack/react-router";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export const Route = createLazyFileRoute("/codes")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Navbar />
      <div className="p-2">
        <h3>Codes</h3>
      </div>
      <Footer />
    </>
  );
}
