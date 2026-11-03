// assets/scss/print.scss turns the page into a light document while html.printing is set;
// "Save as PDF" in the print dialog does the rest. The title becomes the PDF file name.
export function exportPdf(title?: string) {
  const html = document.documentElement;
  const previousTitle = document.title;
  if (title) document.title = title;
  html.classList.add("printing");
  window.addEventListener(
    "afterprint",
    () => {
      html.classList.remove("printing");
      document.title = previousTitle;
    },
    { once: true },
  );
  // Two frames so the light theme is painted before the browser takes the print snapshot
  requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
}
