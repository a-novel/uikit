"use client";

import { DefaultNavZone } from "../../default-nav-zone";
import { Screen } from "@components/stateful";

const Page = () => (
  <DefaultNavZone>
    <Screen footer="This is the footer part of the screen.">
      <div style={{ width: "100%", height: "200vh", flexGrow: "1", backgroundColor: "var(--blue-dark)" }}>
        The blue block is the screen area.
      </div>
    </Screen>
  </DefaultNavZone>
);

export default Page;
