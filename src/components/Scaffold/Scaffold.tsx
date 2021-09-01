import { ChildrenType } from "../../types/ChildrenType"
import { Header } from "../Header/Header"
import { Modal } from "../Modal/Modal"
import { MainContext } from "../../contexts/MainContext"
import { useContext } from "react"

import styles from "./Scaffold.module.css"

const Scaffold = ({children}: ChildrenType) => {

  const context = useContext(MainContext)

  return (
    <>
      <div className={styles.Scaffold}>
        <Header />
        {children}
      </div>
      <Modal component={context.modalInnerComponent} />
    </>
  )
}

export default Scaffold