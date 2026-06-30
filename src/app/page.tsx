import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Context7 for React</p>
          <h1>Context7 chat widget demo</h1>
          <p>
            This Next.js app shows how a React documentation site can load the
            Context7 AI chat widget on every page with one async script.
          </p>
          <a
            className={styles.primaryLink}
            href="https://context7.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit context7.com
          </a>
        </section>

        <section className={styles.preview} aria-label="Widget setup">
          <div className={styles.browserBar}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.previewBody}>
            <p className={styles.previewLabel}>Root layout</p>
            <pre>
              <code>
                {'<Script\n  src="https://context7.com/widget.js"\n  data-library="/reactjs/react.dev"\n  strategy="afterInteractive"\n/>'}
              </code>
            </pre>
          </div>
        </section>
      </main>
      <div className={styles.widgetPulse} aria-hidden="true">
        <span className={styles.widgetPulseRing} />
        <span className={styles.widgetPulseRing} />
        <span className={styles.widgetPulseRing} />
      </div>
    </div>
  );
}
