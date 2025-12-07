import { z } from "zod";

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
}

export enum LNG {
  EN = "en",
  FR = "fr",
}

export const SUPPORTED_LNGS = Object.values(LNG);

export const DEFAULT_LNG = LNG.EN;

export const LngSchema = z.enum(SUPPORTED_LNGS);

export const LNG_META: Record<LNG, LngMeta> = {
  [LNG.EN]: {
    flag: "us",
    label: "English",
  },
  [LNG.FR]: {
    flag: "fr",
    label: "Français",
  },
};
