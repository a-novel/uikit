"use client";

import logoButton from "../../../../../public/uikit/logo/logo-button.png";
import MoreIcon from "@public/icons/monochrome/more-horizontal.svg";

import { useState } from "react";

import { DefaultContent } from "../../default-content";
import { DropMenu, DropMenuActions, H2, NavWrapper } from "@components/stateful";
import { NavLabel, NavLink, NavLinkHome, NavZone, UserProfileLink } from "@components/stateless";

const Page = () => {
  const [active, setActive] = useState("/");

  const NavComponent = (
    <>
      <NavZone>
        <NavLinkHome
          src={logoButton}
          alt="logo button"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setActive("/");
          }}
        />
        <NavLink type="button" className={active === "/foo" ? "active" : undefined} onClick={() => setActive("/foo")}>
          Page 1
        </NavLink>
        <NavLink type="button" className={active === "/bar" ? "active" : undefined} onClick={() => setActive("/bar")}>
          Page 2
        </NavLink>
        <NavLink type="button" className={active === "/qux" ? "active" : undefined} onClick={() => setActive("/qux")}>
          Page 3
        </NavLink>
      </NavZone>
      <NavZone>
        <NavLink
          type="button"
          decorator="premium"
          className={active === "/premium" ? "active" : undefined}
          onClick={() => setActive("/premium")}
        >
          Premium Page
        </NavLink>
      </NavZone>
      <NavZone>
        <UserProfileLink
          href="/user"
          pathname={active}
          username="John Doe"
          email="foo@example.com"
          onClick={(e) => {
            e.preventDefault();
            setActive("/user");
          }}
        />
        <DropMenu icon={<MoreIcon />}>
          <DropMenuActions>
            <NavLink
              type="button"
              className={active === "/profile/view" ? "active" : undefined}
              onClick={() => setActive("/profile/view")}
            >
              View Profile
            </NavLink>
            <NavLink
              type="button"
              className={active === "/profile/edit" ? "active" : undefined}
              onClick={() => setActive("/profile/edit")}
            >
              Edit Profile
            </NavLink>
            <NavLink type="button" decorator="danger">
              Logout
            </NavLink>
          </DropMenuActions>
        </DropMenu>
      </NavZone>
    </>
  );

  const subNavComponent = (
    <>
      <NavZone>
        <NavLabel>Pages links</NavLabel>
        <NavLink type="button" className={active === "/foo" ? "active" : undefined} onClick={() => setActive("/foo")}>
          SubPage 1
        </NavLink>
        <NavLink type="button" className={active === "/bar" ? "active" : undefined} onClick={() => setActive("/bar")}>
          SubPage 2
        </NavLink>
        <NavLink type="button" className={active === "/qux" ? "active" : undefined} onClick={() => setActive("/qux")}>
          SubPage 3
        </NavLink>
      </NavZone>
    </>
  );

  return (
    <NavWrapper main navComponent={NavComponent} mode="horizontal">
      <DefaultContent />
      <NavWrapper navComponent={subNavComponent} mode="vertical">
        <section>
          <H2>SubSection 1</H2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dapibus massa libero. Mauris vulputate
            sapien a elit tempor congue. Vivamus lobortis mauris sit amet ipsum tempor convallis. Nunc non augue cursus,
            maximus nulla tincidunt, molestie quam. In hac habitasse platea dictumst. Suspendisse mollis, ipsum sed
            egestas ultricies, nisl sem efficitur nisi, rhoncus hendrerit tortor magna et lectus. Donec vitae semper
            sem. Maecenas at lobortis metus. Pellentesque consequat nibh non commodo venenatis. Vivamus sed massa
            accumsan, sodales nulla hendrerit, cursus massa. Aliquam blandit nisl vitae purus elementum, eu fermentum
            odio posuere. Quisque aliquam condimentum magna sed fermentum. Etiam pulvinar ipsum accumsan tortor iaculis
            congue. Quisque interdum malesuada arcu ac placerat. Etiam ut velit sed orci dignissim consectetur et et
            felis. Phasellus consequat ac libero nec ullamcorper. Fusce urna velit, pellentesque id sollicitudin eget,
            iaculis et orci. Aliquam fermentum, nibh at rutrum ullamcorper, tellus nulla vehicula dui, id tincidunt dui
            nulla at urna. In convallis dolor tellus, et suscipit enim tempus ut. Phasellus in neque convallis,
            facilisis tortor vel, porttitor augue. Nunc ultricies viverra sapien, at egestas leo fermentum vel. In eget
            metus orci. Mauris in fermentum tellus. Sed ut ornare nisl. Nulla suscipit est in nisi molestie convallis.
            Aenean iaculis turpis non ultricies vulputate. Aliquam ac urna vel turpis fringilla posuere quis quis metus.
            Maecenas ut tortor suscipit justo sollicitudin vestibulum et ac urna. Proin risus velit, tempus non viverra
            quis, varius rutrum libero. Quisque sed suscipit risus. Aenean orci libero, lobortis quis lacinia sit amet,
            egestas eu tortor. Curabitur in tellus vitae felis tincidunt facilisis. Aenean dapibus nulla rhoncus
            ultrices aliquet. Nullam ac consectetur purus. Cras varius lorem eget lorem porta lacinia. Aliquam molestie
            nisi in erat viverra elementum ac sed erat. Donec vitae mollis nibh. Suspendisse nunc velit, sollicitudin at
            odio ac, accumsan placerat purus.
          </p>
        </section>
        <NavWrapper navComponent={subNavComponent} mode="horizontal">
          <section>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dapibus massa libero. Mauris vulputate
              sapien a elit tempor congue. Vivamus lobortis mauris sit amet ipsum tempor convallis. Nunc non augue
              cursus, maximus nulla tincidunt, molestie quam. In hac habitasse platea dictumst. Suspendisse mollis,
              ipsum sed egestas ultricies, nisl sem efficitur nisi, rhoncus hendrerit tortor magna et lectus. Donec
              vitae semper sem. Maecenas at lobortis metus. Pellentesque consequat nibh non commodo venenatis. Vivamus
              sed massa accumsan, sodales nulla hendrerit, cursus massa. Aliquam blandit nisl vitae purus elementum, eu
              fermentum odio posuere. Quisque aliquam condimentum magna sed fermentum. Etiam pulvinar ipsum accumsan
              tortor iaculis congue. Quisque interdum malesuada arcu ac placerat. Etiam ut velit sed orci dignissim
              consectetur et et felis. Phasellus consequat ac libero nec ullamcorper. Fusce urna velit, pellentesque id
              sollicitudin eget, iaculis et orci. Aliquam fermentum, nibh at rutrum ullamcorper, tellus nulla vehicula
              dui, id tincidunt dui nulla at urna. In convallis dolor tellus, et suscipit enim tempus ut. Phasellus in
              neque convallis, facilisis tortor vel, porttitor augue. Nunc ultricies viverra sapien, at egestas leo
              fermentum vel. In eget metus orci. Mauris in fermentum tellus. Sed ut ornare nisl. Nulla suscipit est in
              nisi molestie convallis. Aenean iaculis turpis non ultricies vulputate. Aliquam ac urna vel turpis
              fringilla posuere quis quis metus. Maecenas ut tortor suscipit justo sollicitudin vestibulum et ac urna.
              Proin risus velit, tempus non viverra quis, varius rutrum libero. Quisque sed suscipit risus. Aenean orci
              libero, lobortis quis lacinia sit amet, egestas eu tortor. Curabitur in tellus vitae felis tincidunt
              facilisis. Aenean dapibus nulla rhoncus ultrices aliquet. Nullam ac consectetur purus. Cras varius lorem
              eget lorem porta lacinia. Aliquam molestie nisi in erat viverra elementum ac sed erat. Donec vitae mollis
              nibh. Suspendisse nunc velit, sollicitudin at odio ac, accumsan placerat purus.
            </p>
          </section>
        </NavWrapper>
        <NavWrapper navComponent={subNavComponent} mode="horizontal">
          <section>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dapibus massa libero. Mauris vulputate
              sapien a elit tempor congue. Vivamus lobortis mauris sit amet ipsum tempor convallis. Nunc non augue
              cursus, maximus nulla tincidunt, molestie quam. In hac habitasse platea dictumst. Suspendisse mollis,
              ipsum sed egestas ultricies, nisl sem efficitur nisi, rhoncus hendrerit tortor magna et lectus. Donec
              vitae semper sem. Maecenas at lobortis metus. Pellentesque consequat nibh non commodo venenatis. Vivamus
              sed massa accumsan, sodales nulla hendrerit, cursus massa. Aliquam blandit nisl vitae purus elementum, eu
              fermentum odio posuere. Quisque aliquam condimentum magna sed fermentum. Etiam pulvinar ipsum accumsan
              tortor iaculis congue. Quisque interdum malesuada arcu ac placerat. Etiam ut velit sed orci dignissim
              consectetur et et felis. Phasellus consequat ac libero nec ullamcorper. Fusce urna velit, pellentesque id
              sollicitudin eget, iaculis et orci. Aliquam fermentum, nibh at rutrum ullamcorper, tellus nulla vehicula
              dui, id tincidunt dui nulla at urna. In convallis dolor tellus, et suscipit enim tempus ut. Phasellus in
              neque convallis, facilisis tortor vel, porttitor augue. Nunc ultricies viverra sapien, at egestas leo
              fermentum vel. In eget metus orci. Mauris in fermentum tellus. Sed ut ornare nisl. Nulla suscipit est in
              nisi molestie convallis. Aenean iaculis turpis non ultricies vulputate. Aliquam ac urna vel turpis
              fringilla posuere quis quis metus. Maecenas ut tortor suscipit justo sollicitudin vestibulum et ac urna.
              Proin risus velit, tempus non viverra quis, varius rutrum libero. Quisque sed suscipit risus. Aenean orci
              libero, lobortis quis lacinia sit amet, egestas eu tortor. Curabitur in tellus vitae felis tincidunt
              facilisis. Aenean dapibus nulla rhoncus ultrices aliquet. Nullam ac consectetur purus. Cras varius lorem
              eget lorem porta lacinia. Aliquam molestie nisi in erat viverra elementum ac sed erat. Donec vitae mollis
              nibh. Suspendisse nunc velit, sollicitudin at odio ac, accumsan placerat purus.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dapibus massa libero. Mauris vulputate
              sapien a elit tempor congue. Vivamus lobortis mauris sit amet ipsum tempor convallis. Nunc non augue
              cursus, maximus nulla tincidunt, molestie quam. In hac habitasse platea dictumst. Suspendisse mollis,
              ipsum sed egestas ultricies, nisl sem efficitur nisi, rhoncus hendrerit tortor magna et lectus. Donec
              vitae semper sem. Maecenas at lobortis metus. Pellentesque consequat nibh non commodo venenatis. Vivamus
              sed massa accumsan, sodales nulla hendrerit, cursus massa. Aliquam blandit nisl vitae purus elementum, eu
              fermentum odio posuere. Quisque aliquam condimentum magna sed fermentum. Etiam pulvinar ipsum accumsan
              tortor iaculis congue. Quisque interdum malesuada arcu ac placerat. Etiam ut velit sed orci dignissim
              consectetur et et felis. Phasellus consequat ac libero nec ullamcorper. Fusce urna velit, pellentesque id
              sollicitudin eget, iaculis et orci. Aliquam fermentum, nibh at rutrum ullamcorper, tellus nulla vehicula
              dui, id tincidunt dui nulla at urna. In convallis dolor tellus, et suscipit enim tempus ut. Phasellus in
              neque convallis, facilisis tortor vel, porttitor augue. Nunc ultricies viverra sapien, at egestas leo
              fermentum vel. In eget metus orci. Mauris in fermentum tellus. Sed ut ornare nisl. Nulla suscipit est in
              nisi molestie convallis. Aenean iaculis turpis non ultricies vulputate. Aliquam ac urna vel turpis
              fringilla posuere quis quis metus. Maecenas ut tortor suscipit justo sollicitudin vestibulum et ac urna.
              Proin risus velit, tempus non viverra quis, varius rutrum libero. Quisque sed suscipit risus. Aenean orci
              libero, lobortis quis lacinia sit amet, egestas eu tortor. Curabitur in tellus vitae felis tincidunt
              facilisis. Aenean dapibus nulla rhoncus ultrices aliquet. Nullam ac consectetur purus. Cras varius lorem
              eget lorem porta lacinia. Aliquam molestie nisi in erat viverra elementum ac sed erat. Donec vitae mollis
              nibh. Suspendisse nunc velit, sollicitudin at odio ac, accumsan placerat purus.
            </p>
          </section>
        </NavWrapper>
      </NavWrapper>
    </NavWrapper>
  );
};

export default Page;
