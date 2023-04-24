import {
  SelectInput,
  SelectInputProps,
  SelectInputValidated,
  SelectInputValidatedProps,
  SelectItemWithIcon,
} from "@components/stateful";
import { FC } from "react";

import MaleIcon from "@public/icons/colored/man.svg";
import FemaleIcon from "@public/icons/colored/woman.svg";

export type Sex = "male" | "female";

export interface SexInputTranslations {
  male: string;
  female: string;
}

export interface SexInputProps extends Omit<SelectInputProps<Sex>, "values" | "render"> {
  translations: SexInputTranslations;
}

export const SexInput: FC<SexInputProps> = ({ translations, ...props }) => (
  <SelectInput
    render={(value) => (value ? translations[value] : "")}
    values={[
      { value: "male", render: <SelectItemWithIcon icon={<MaleIcon />} value={translations.male} /> },
      { value: "female", render: <SelectItemWithIcon icon={<FemaleIcon />} value={translations.female} /> },
    ]}
    {...props}
  />
);

export interface SexInputValidatedProps extends Omit<SelectInputValidatedProps<Sex>, "values"> {
  translations: SexInputTranslations;
}

export const SexInputValidated: FC<SexInputValidatedProps> = ({ translations, ...props }) => (
  <SelectInputValidated
    render={(value) => (value ? translations[value] : "")}
    values={[
      { value: "male", render: <SelectItemWithIcon icon={<MaleIcon />} value={translations.male} /> },
      { value: "female", render: <SelectItemWithIcon icon={<FemaleIcon />} value={translations.female} /> },
    ]}
    {...props}
  />
);
