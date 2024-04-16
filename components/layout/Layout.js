import styles from "./Layout.module.css";
import Link from "next/link";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Link href="/">BOTOFOOD</Link>
        </div>
        <div className={styles.right}>
          <Link href="/menu">menu</Link>
          <Link href="/categories">categories</Link>
        </div>
      </header>
      <div className={styles.container}>{children}</div>
      <footer className={styles.footer}>
        <a href="https://github.com/sarok86" target="_blank" rel="noreferrer">
            Sarok | Next.Js | BotoFood &copy;
        </a>
      </footer>
    </>
  );
}

export default Layout;
