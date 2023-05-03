import SearchIcon from "@public/icons/monochrome/search.svg";

import { FC } from "react";

import { InputToolbox, InputToolboxAction, TextArea, TextAreaProps, TextInput, TextInputProps } from "../../../index";

export type SearchInputProps = {
  onSearch?: (value: string) => void;
} & (
  | ({
      inline: true;
    } & Omit<TextInputProps, "type">)
  | ({ inline?: never } & TextAreaProps)
);

export const SearchInput: FC<SearchInputProps> = ({ children, onSearch, inline, ...props }) => {
  const toolboxActions: InputToolboxAction[] = [
    {
      id: "search",
      onClick: () => onSearch?.(props.value),
      icon: <SearchIcon />,
    },
  ];

  if (inline === true) {
    return (
      <TextInput type="search" {...(props as TextInputProps)}>
        <InputToolbox actions={toolboxActions} />
      </TextInput>
    );
  } else {
    return (
      <TextArea style={{ maxHeight: "5.5rem" }} {...(props as TextAreaProps)}>
        <InputToolbox actions={toolboxActions} />
      </TextArea>
    );
  }
};
