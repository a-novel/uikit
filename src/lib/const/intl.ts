/**
 * LangMetadata interface represents metadata for a language in the UI selector.
 */
export interface LngMeta {
  /**
   * The country identifier of the flag. Flags are retrieved from https://flagcdn.com.
   */
  flag: string;
  /**
   * Display label for the given language (eg. "English", "Français").
   */
  label: string;
  /**
   * Short display label for the given language (eg. "ENG", "FRA").
   */
  shortLabel: string;
}

export enum LNG {
  EN = "en",
  FR = "fr",
}

export const DEFAULT_LNG = LNG.EN;

export const LNG_META: Record<LNG, LngMeta> = {
  [LNG.EN]: {
    flag: "us",
    label: "English",
    shortLabel: "ENG",
  },
  [LNG.FR]: {
    flag: "fr",
    label: "Français",
    shortLabel: "FRA",
  },
};
