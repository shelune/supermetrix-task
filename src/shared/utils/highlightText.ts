import { createElement, DetailedReactHTMLElement } from "react";

export function escapeRegExp(string: string): string {
  // $& means the whole matched string
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function highlightText(
  string: string,
  highlight: string,
  highlightClass = "",
): (
  | DetailedReactHTMLElement<
      {
        className: string;
      },
      HTMLElement
    >
  | string
)[] {
  if (!string || typeof string !== "string") {
    return ["-"];
  }
  if (!highlight || highlight.length === 0) return [string];
  const reg = new RegExp(escapeRegExp(highlight), "gi");
  const res = [];
  let lastIndex = 0;
  let result;
  // eslint-disable-next-line no-cond-assign
  while ((result = reg.exec(string))) {
    res.push(string.substring(lastIndex, result.index));
    res.push(
      createElement(
        "span",
        { className: highlightClass, key: `${highlight}-${lastIndex}` },
        [result[0]],
      ),
    );
    lastIndex = result.index + result[0].length;
  }
  res.push(string.substring(lastIndex));
  return res;
}
