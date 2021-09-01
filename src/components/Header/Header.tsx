import { Nav } from "../Nav/Nav"
import styles from "./Header.module.css"

export const Header = () => {
  return (
    <header className={styles.Header}>
      <img src="logo.png" alt="mynotes" />
      <Nav />
    </header>
  )
}