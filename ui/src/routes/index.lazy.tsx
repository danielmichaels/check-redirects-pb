import { createLazyFileRoute } from "@tanstack/react-router";
import Banner from "~/components/Banner";
import Features from "~/components/Features";
import SearchBar from "~/components/SearchBar";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Navbar />
      <Banner />
      <SearchBar />
      <Features />
      <Footer />
    </>
  );
}
