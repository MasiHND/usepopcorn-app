import styles from "./AppFooter.module.css";

function AppFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} Developed By MasiHND.
      </p>
    </footer>
  );
}

export default AppFooter;
