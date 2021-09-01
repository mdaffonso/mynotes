import { useContext } from "react"
import { Card } from "../components/Card/Card"
import { MainContext } from "../contexts/MainContext"

import styles from "./Home.module.css"

export const Home = () => {

  const context = useContext(MainContext)

  return (
    <div className={styles.List}>
      {context.listOfNotes.length === 0 && <p className={styles.EmptyList}>Você não tem nenhuma nota salva ainda. Clique no botão "+" para adicionar uma nova.</p>}
      {context.listOfNotes.map(note => (
        <Card id={note.id} title={note.title} content={note.content} image={note.image} imageDescription={note.title} key={note.id} />
      ))}
    </div>
  )
}