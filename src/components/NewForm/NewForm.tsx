import { FormEvent, useContext } from "react"
import { useState } from "react"
import toast from "react-hot-toast"
import { MainContext } from "../../contexts/MainContext"
import { useImageCheck } from "../../hooks/useImageCheck"
import { randomIdGenerator } from "../../utils/utils"

import styles from "./NewForm.module.css"

export const NewForm = () => {
  const emptyError = {
    title: "",
    content: "",
    image: ""
  }

  const [error, setError] = useState(emptyError)
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [content, setContent] = useState("")
  const context = useContext(MainContext)
  const imageChecker = useImageCheck(image, 3000)

  const resetForm = () => {
    setTitle("")
    setImage("")
    setContent("")
  }

  const newNoteHandler = async (e: FormEvent<HTMLFormElement>) => {
    let hasError = false
    e.preventDefault()
    if (image && (await imageChecker === "error" || await imageChecker === "timeout")) {
      setError(prevError => ({...prevError, image: "O valor informado deve ser uma URL contendo uma imagem"}))
      hasError = true
    }

    if (!title) {
      setError(prevError => ({...prevError, title: "O título é obrigatório"}))
      hasError = true
    }

    if (hasError) {
      return
    }

    const newNote = {
      id: randomIdGenerator(16),
      title,
      image,
      content
    }

    context.updateList(newNote, "new")
    context.toggleModal()
    resetForm()
    setError(emptyError)
    hasError = false
    toast.success("Nota criada com sucesso!")
  }

  return (
    <form className={styles.NewForm} onSubmit={newNoteHandler}>
      <h1>Criar Nova Nota</h1>
      <div className={styles.InputGroup}>
        <label htmlFor="title">Título</label>
        <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        { error.title && <div>{error.title}</div> }
      </div>

      <div className={styles.InputGroup}>
        <label htmlFor="image">URL de Imagem</label>
        <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
        { error.image && <div>{error.image}</div> }
      </div>

      <div className={styles.InputGroup}>
        <label htmlFor="content">Conteúdo</label>
        <textarea rows={4} name="content" id="content" value={content} onChange={(e) => setContent(e.target.value)} />
        { error.content && <div>{error.content}</div> }
      </div>

      <button type="submit">Criar</button>
    </form>
  )
}