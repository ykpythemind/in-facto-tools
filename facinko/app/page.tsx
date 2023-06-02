import { Metadata } from "next";
import Main from "./components/Main";

export default function Page() {
  return <Main />;
}

export const metadata: Metadata = {
  title: "facinko",
  icons: {
    icon: "/favicon.ico",
  },
  description: "facinko",
};
