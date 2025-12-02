import React from "react";
import type { Metadata } from "next";
import ProjectShowcase from "./components/ProjectShowcase";

export const metadata: Metadata = {
  title: "Kyle Osunero | Portfolio",
};

export default function Home() {
  return <ProjectShowcase />;
}
