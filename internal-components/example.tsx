import css from "./example.module.css";
import { FC } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

export const Usage: FC<{ code: string; import?: string }> = ({ code, import: importCode }) => (
  <div className={css.usageWrapper}>
    {importCode && (
      <pre
        className={css.usageImport}
        dangerouslySetInnerHTML={{ __html: hljs.highlight(importCode.trim(), { language: "tsx" }).value }}
      />
    )}
    <pre
      className={css.usage}
      dangerouslySetInnerHTML={{ __html: hljs.highlight(code.trim(), { language: "tsx" }).value }}
    />
  </div>
);
