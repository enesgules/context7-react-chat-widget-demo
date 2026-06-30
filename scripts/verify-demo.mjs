import { readFile } from "node:fs/promises";

const files = {
  layout: new URL("../src/app/layout.tsx", import.meta.url),
  page: new URL("../src/app/page.tsx", import.meta.url),
  styles: new URL("../src/app/page.module.css", import.meta.url),
};

const [layout, page, styles] = await Promise.all([
  readFile(files.layout, "utf8"),
  readFile(files.page, "utf8"),
  readFile(files.styles, "utf8"),
]);

const previewSectionStart = page.indexOf(
  '<section className={styles.preview}'
);
const previewSectionEnd = page.indexOf("</section>", previewSectionStart);
const previewSection =
  previewSectionStart === -1 || previewSectionEnd === -1
    ? ""
    : page.slice(previewSectionStart, previewSectionEnd);

const checks = [
  {
    label: "loads the Context7 widget script globally",
    passed: layout.includes('src="https://context7.com/widget.js"'),
  },
  {
    label: "targets the React docs library",
    passed: layout.includes('data-library="/reactjs/react.dev"'),
  },
  {
    label: "uses afterInteractive loading for the third-party widget",
    passed: layout.includes('strategy="afterInteractive"'),
  },
  {
    label: "labels the page as a Context7 chat widget demo for React",
    passed:
      page.includes("Context7 chat widget demo") &&
      page.includes("React documentation"),
  },
  {
    label: "links to context7.com",
    passed: page.includes('href="https://context7.com"'),
  },
  {
    label: "does not render the generated demo footer",
    passed:
      !page.includes("Bootstrapped with create-next-app.") &&
      !page.includes("Ready for Vercel deployment."),
  },
  {
    label: "places pulse rings outside the fake window at the widget position",
    passed:
      page.includes("styles.widgetPulse") &&
      page.includes("styles.widgetPulseRing") &&
      styles.includes(".widgetPulse") &&
      styles.includes(".widgetPulseRing") &&
      styles.includes("right: 10px;") &&
      styles.includes("bottom: 10px;") &&
      styles.includes("width: 76px;") &&
      styles.includes("height: 76px;") &&
      styles.includes("border: 7px solid rgba(5, 150, 105, 0.72);") &&
      styles.includes("animation: pulseRing 5.8s ease-out infinite;") &&
      styles.includes("animation-delay: 1.95s;") &&
      styles.includes("animation-delay: 3.5s;") &&
      styles.includes("transform: scale(4.2);") &&
      styles.includes("@keyframes pulseRing") &&
      !previewSection.includes("widgetPulse") &&
      !page.includes("styles.widgetPointer") &&
      !page.includes("Floating chat button loads bottom-right") &&
      !page.includes("styles.widgetDot"),
  },
  {
    label: "keeps the fake window compact",
    passed:
      styles.includes("min-height: 320px;") &&
      !styles.includes("min-height: 420px;") &&
      !styles.includes("min-height: 360px;") &&
      !styles.includes("min-height: 330px;"),
  },
];

const failures = checks.filter((check) => !check.passed);

if (failures.length > 0) {
  console.error("Demo verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure.label}`);
  }
  process.exit(1);
}

console.log("Demo verification passed.");
