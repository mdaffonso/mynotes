import styles from "./Nav.module.css"
import { MainContext } from "../../contexts/MainContext"
import { useContext } from "react"
import { NewForm } from "../NewForm/NewForm"

export const Nav = () => {
  const context = useContext(MainContext)

  const newItem = () => {
    context.toggleModal()
    context.setModalInnerComponent(() => <NewForm />)
  }

  return (
    <button onClick={newItem} data-open={context.modalOpen} className={styles.NavButton}></button>
  )
}