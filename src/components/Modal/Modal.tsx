import styles from "./Modal.module.css"
import { ModalType } from "../../types/ModalType"
import { useContext } from "react"
import { MainContext } from "../../contexts/MainContext"
import { useEffect } from "react"

export const Modal = ({component}: ModalType) => {
  const context = useContext(MainContext)
  useEffect(() => {
    const toggleByEsc = (e: any) => {
      if(e.key === "Escape" && context.modalOpen) {
        context.toggleModal()
      }
    }

    window.addEventListener("keyup", toggleByEsc)
    return () => window.removeEventListener("keyup", toggleByEsc)
  }, [context])
  return (
    <div className={styles.Modal} aria-expanded={context.modalOpen} data-transition={context.modalTransition}>
      {component}
    </div>
  )
}