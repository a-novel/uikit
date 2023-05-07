"use client";

import TacosIcon from "@public/icons/colored/tacos.svg";

import { DefaultContent } from "../../default-content";
import { DefaultNavZone } from "../../default-nav-zone";
import { Modal, ModalButtonZone, ModalContent, ModalTitle } from "@components/stateful";
import { Button } from "@components/stateless";

const Page = () => (
  <DefaultNavZone>
    <DefaultContent />
    <Modal visible>
      <ModalTitle icon={<TacosIcon />}>
        This is a very long modal title to see how it blends with the icon on its side
      </ModalTitle>
      <ModalContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum
      </ModalContent>
      <ModalButtonZone>
        <Button>Click me</Button>
        <Button onClick={() => console.log("douchebag")} decorator="danger">
          Don&apos;t click me
        </Button>
      </ModalButtonZone>
    </Modal>
  </DefaultNavZone>
);

export default Page;
