import styles from "./Modal.module.css"
import { ModalType } from "../../types/ModalType"
import { useContext } from "react"
import { MainContext } from "../../contexts/MainContext"

export const Modal = ({component}: ModalType) => {
  const context = useContext(MainContext)
  return (
    <div className={styles.Modal} aria-expanded={context.modalOpen} data-transition={context.modalTransition}>
      {component}
    </div>
  )
}