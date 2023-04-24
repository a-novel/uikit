import css from "./user-profile.module.css";
import { NavLink, NavLinkProps } from "@components/stateless";
import { FC } from "react";

export type UserProfileLinkProps = NavLinkProps & {
  /**
   * Display name of the user.
   */
  username: string;
  /**
   * Email of the user.
   */
  email: string;
};

/**
 * Display a link to a user profile.
 */
export const UserProfileLink: FC<UserProfileLinkProps> = ({ username, email, ...props }) => (
  <NavLink {...props}>
    <div className={css.wrapper}>
      <span className={css.name}>{username}</span>
      <span className={css.email}>{email}</span>
    </div>
  </NavLink>
);
