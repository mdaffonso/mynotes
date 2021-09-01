import { useContext, useRef } from "react"
import toast from "react-hot-toast"
import { MainContext } from "../../contexts/MainContext"
import { CardType } from "../../types/CardType"
import { EditForm } from "../EditForm/EditForm"
import styles from "./Card.module.css"

export const Card = ({id, title, content, image, imageDescription}: CardType) => {

  const context = useContext(MainContext)

  const deleteNote = () => {
    cardRef.current?.setAttribute("data-remove", "true")
    toast.success("Nota removida com sucesso")
    setTimeout(() => {
      context.updateList({id, title, content, image}, "delete")
    }, 200)
  }

  const cardRef = useRef<HTMLDivElement | null>(null)
  const h1Ref = useRef<HTMLDivElement | null>(null)

  const toggleEditHandler = () => {
    context.setModalInnerComponent(() => <EditForm note={{id, title, content, image}} />)
    context.toggleModal()
  }

  return (
    <div ref={cardRef} className={styles.Card}>
      <h2 ref={h1Ref}>{title}</h2>
      <div className={styles.ButtonGroup}>
        <button data-action="edit" onClick={toggleEditHandler}><img src="icon-edit.png" alt="edit icon" /></button>
        <button data-action="delete" onClick={deleteNote}><img src="icon-delete.png" alt="delete icon" /></button>
      </div>
      <div className={styles.ContentGroup} data-title={title}>
        {image && <img src={image} alt={imageDescription} />}
        {content && <p>{content}</p>}
      </div>
    </div>
  )
}