import { FormEvent, useContext, useEffect, useState, useRef } from "react"
import toast from "react-hot-toast"
import { MainContext } from "../../contexts/MainContext"
import { useImageCheck } from "../../hooks/useImageCheck"
import { EditNoteType } from "../../types/EditNoteType"

import styles from "./EditForm.module.css"

export const EditForm = ({note}: EditNoteType) => {
  const emptyError = {
    title: "",
    content: "",
    image: ""
  }

  const firstRef = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState(emptyError)
  const [title, setTitle] = useState(note.title)
  const [image, setImage] = useState(note.image || "")
  const [content, setContent] = useState(note.content)
  const context = useContext(MainContext)
  const imageChecker = useImageCheck(image, 3000)

  const editNoteHandler = async (e: FormEvent<HTMLFormElement>) => {
    let hasError = false
    e.preventDefault()
    setError(emptyError)
    if (image && (await imageChecker === "error" || await imageChecker === "timeout")) {
      setError(prevError => ({...prevError, image: "O valor informado deve ser uma URL contendo uma imagem"}))
      hasError = true
    }

    if (!title.trim()) {
      setError(prevError => ({...prevError, title: "O título é obrigatório"}))
      hasError = true
    }

    if (hasError) {
      return
    }

    const editedNote = {
      id: note.id,
      title,
      image,
      content
    }

    context.updateList(editedNote, "edit")
    context.toggleModal()
    hasError = false
    toast.success("Nota editada com sucesso!")
  }

  
  useEffect(() => {
    if(context.modalOpen) {
      firstRef.current?.focus()
    }
  }, [context])

  return (
    <form className={styles.EditForm} onSubmit={editNoteHandler}>
      <h1>Editar Nota</h1>
      <div className={styles.InputGroup}>
        <label htmlFor="title">Título</label>
        <input ref={firstRef} type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={255} />
        { error.title && <div>{error.title}</div> }
      </div>

      <div className={styles.InputGroup}>
        <label htmlFor="image">URL de Imagem</label>
        <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)} maxLength={500} />
        { error.image && <div>{error.image}</div> }
      </div>

      <div className={styles.InputGroup}>
        <label htmlFor="content">Conteúdo</label>
        <textarea rows={4} name="content" id="content" value={content} onChange={(e) => setContent(e.target.value)} />
        { error.content && <div>{error.content}</div> }
      </div>

      <button type="submit">Enviar</button>
    </form>
  )
}