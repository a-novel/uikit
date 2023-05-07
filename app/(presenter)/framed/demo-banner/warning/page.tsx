"use client";

import { DefaultContent } from "../../default-content";
import { DefaultNavZone } from "../../default-nav-zone";
import { Banner } from "@components/stateful";

const Page = () => (
  <Banner content={[{ decorator: "warning", content: "I am a banner with a lot of information." }]}>
    <DefaultNavZone>
      <DefaultContent />
    </DefaultNavZone>
  </Banner>
);

export default Page;
