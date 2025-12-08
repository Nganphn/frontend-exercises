import styles from "../page.module.css";

export default function About() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>The About Page</h1>
          <p>About page content</p>
        </div>
      </main>
    </div>
  );
}