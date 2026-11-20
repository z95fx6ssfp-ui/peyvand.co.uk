// Thread helpers (20 Nov 2026). Each thread is drawn as a line; a thread's line style comes
// from its position in the `order` sort, so nothing is set by hand. Colour never carries the
// meaning alone: the dash pattern differs too, and the thread is always named in text.
// All three colours pass 3:1 against Paper, Saffron and Rose (design.md section 2).
export const THREAD_STYLES = [
  { colour: "var(--pomegranate)", dash: "" },
  { colour: "var(--firoozeh)", dash: "" },
  { colour: "var(--ink)", dash: "2 8" },
  { colour: "var(--pomegranate)", dash: "14 8" },
  { colour: "var(--firoozeh)", dash: "14 8" },
  { colour: "var(--ink)", dash: "" },
] as const;

export const threadStyle = (index: number) => THREAD_STYLES[index % THREAD_STYLES.length];

// Where a tag link goes: the catalogue, filtered to that word.
export const tagHref = (group: "role" | "medium" | "setting" | "status" | "themes", value: string) =>
  `/work/?${group}=${encodeURIComponent(value)}`;

export const years = (d: { year: number; endYear?: number }) =>
  d.endYear && d.endYear !== d.year ? `${d.year} to ${d.endYear}` : String(d.year);

// Split a title such as "DUAL دوگانه" into its Latin and Farsi parts.
export const splitTitle = (title: string) => {
  const farsi = title.match(/[؀-ۿ][؀-ۿ\s‌]*/);
  return { latin: farsi ? title.replace(farsi[0], "").trim() : title, farsi: farsi ? farsi[0].trim() : null };
};
