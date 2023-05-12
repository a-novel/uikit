import { Metadata } from "next";

import { PageComponent } from "./page-component";

export const metadata: Metadata = {
  title: "UI Infinite Feed",
};

const Page = () => <PageComponent />;

export default Page;
