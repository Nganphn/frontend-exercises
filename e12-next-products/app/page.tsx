import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>The Home Page</h1>
          <p>Home page content</p>
        </div>
      </main>
    </div>
  );
}
