import VisibilityOff from "@public/icons/monochrome/visibility_off.svg";
import VisibilityOn from "@public/icons/monochrome/visibility_on.svg";

import { FC, useState } from "react";

import {
  InputToolbox,
  TextInput,
  TextInputProps,
  TextInputValidated,
  TextInputValidatedProps,
} from "@components/stateful";

export interface PasswordInputProps extends Omit<TextInputProps, "type"> {
  initialVisibility?: boolean;
}

export const PasswordInput: FC<PasswordInputProps> = ({ initialVisibility = false, children, ...props }) => {
  const [showPassword, setShowPassword] = useState(initialVisibility);

  return (
    <TextInput type={showPassword ? "text" : "password"} {...props}>
      <InputToolbox
        actions={[
          {
            id: "toggle-password-visibility",
            icon: showPassword ? <VisibilityOff /> : <VisibilityOn />,
            onClick: () => setShowPassword(!showPassword),
          },
        ]}
      />
      {children}
    </TextInput>
  );
};

export interface PasswordInputValidatedProps extends Omit<TextInputValidatedProps, "type"> {
  initialVisibility?: boolean;
}

export const PasswordValidatedInput: FC<PasswordInputValidatedProps> = ({
  initialVisibility = false,
  children,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(initialVisibility);

  return (
    <TextInputValidated type={showPassword ? "text" : "password"} {...props}>
      <InputToolbox
        actions={[
          {
            id: "toggle-password-visibility",
            icon: showPassword ? <VisibilityOff /> : <VisibilityOn />,
            onClick: () => setShowPassword(!showPassword),
          },
        ]}
      />
      {children}
    </TextInputValidated>
  );
};
