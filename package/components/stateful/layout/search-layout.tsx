import css from "./search-layout.module.css";

import { ChangeEvent, ComponentType, MutableRefObject, ReactNode, useCallback, useMemo, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { NavWrapper, Screen, SearchInput, SearchInputProps, TextAreaProps, TextInputProps } from "@components/stateful";

import { WithSticky } from "@contexts";

export type SearchLayoutFilter = ComponentType<{ value: string; update: (value: string) => void }>;

export interface SearchLayoutProps<SP extends Record<string, string>> {
  searchParams: SP & { query?: string };
  filters?: Record<Exclude<keyof SP, "query">, SearchLayoutFilter>;
  sideFilters?: Record<Exclude<keyof SP, "query">, SearchLayoutFilter>;
  side?: ReactNode;
  render: ComponentType<{ filters: SP & { query?: string } }>;
  searchBarProps?: Omit<SearchInputProps, "value" | "onSearch">;
  footer?: ReactNode;
}

export const SearchLayout = <SP extends Record<string, string>>({
  filters,
  render: Render,
  searchParams,
  searchBarProps,
  footer,
  sideFilters,
  side,
}: SearchLayoutProps<SP>) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(searchParams.query || "");

  const searchParamsParsed = useMemo(() => {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value != null && value.length > 0) {
        params.set(key, value);
      }
    });

    return params;
  }, [searchParams]);

  const updateSearchParam = useCallback(
    (key: keyof typeof searchParams) => (value: string) => {
      if (value.length > 0) {
        searchParamsParsed.set(key as string, value);
      } else {
        searchParamsParsed.delete(key as string);
      }

      push(`${pathname}?${searchParamsParsed.toString()}`);
    },
    [pathname, push, searchParamsParsed]
  );

  const { onChange: searchBarOnChange, ...searchBarRest } = searchBarProps || {};

  const main = (
    <WithSticky
      render={(stickyRef, stickyStyle, propagateStyle) => (
        <Screen footer={footer} className={css.wrapper} style={propagateStyle}>
          <div className={css.header} ref={stickyRef as MutableRefObject<HTMLDivElement>} style={stickyStyle}>
            <form
              className={css.search}
              onSubmit={(e) => {
                e.preventDefault();
                updateSearchParam("query")(query);
              }}
            >
              <SearchInput
                value={query}
                onChange={(e: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>) => {
                  searchBarOnChange?.(e);
                  setQuery(e.target.value);
                }}
                onSearch={updateSearchParam("query")}
                {...(searchBarRest as any)}
              />
            </form>
            {filters != null
              ? Object.entries(filters).map(([key, Filter]) => (
                  <Filter key={key} value={searchParams[key] || ""} update={updateSearchParam(key)} />
                ))
              : null}
          </div>
          <Render filters={searchParams} />
        </Screen>
      )}
    />
  );

  if (side != null || sideFilters != null) {
    const navComponent = (
      <>
        {sideFilters != null ? (
          <div className={css.sideFilters}>
            {Object.entries(sideFilters).map(([key, Filter]) => (
              <Filter key={key} value={searchParams[key] || ""} update={updateSearchParam(key)} />
            ))}
          </div>
        ) : null}
        {side}
      </>
    );

    return (
      <NavWrapper bordered navComponent={navComponent} mode="vertical">
        {main}
      </NavWrapper>
    );
  }

  return <>{main}</>;
};
