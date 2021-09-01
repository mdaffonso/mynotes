import { useState, ReactNode } from "react"
import { createContext } from "react"
import { ChildrenType } from "../types/ChildrenType"
import { MainContextType } from "../types/MainContextType"
import { NoteType } from "../types/NoteType"
import { NoteListType } from "../types/NoteListType"

export const MainContext = createContext({} as MainContextType)
export const MainContextProvider = ({children}: ChildrenType) => {

  const useStorage = () => {
    const JSONItemsFromStorage = localStorage.getItem("MyNotes")
    if(JSONItemsFromStorage) {
      return JSON.parse(JSONItemsFromStorage)
    }
    return []
  }

  const updateStorage = (jsonObject: NoteListType) => {
    const jsonString = JSON.stringify(jsonObject)
    localStorage.setItem("MyNotes", jsonString)
  }

  const [modalOpen, setModalOpen] = useState(false)
  const [modalTransition, setModalTransition] = useState(true)
  const [modalInnerComponent, setModalInnerComponent] = useState<ReactNode>()
  const [listOfNotes, setListOfNotes] = useState<NoteListType>(useStorage())

  const toggleModal = () => {
    let time = 0
    if(modalOpen) {
      time = 200
    }

    setModalTransition(value => !value)
    setTimeout(() => {
      setModalOpen(value => !value)
    }, time)
  }

  const updateList = (note: NoteType, action: string) => {
    const currList = [ ...listOfNotes ]
    let newList

    switch(action) {
      case "edit":
        const indexOfNote = currList.findIndex(obj => obj.id === note.id)
        newList = currList.filter(oldNote => oldNote.id !== note.id)
        newList.splice(indexOfNote, 0, note)
        break
      
      case "delete":
        newList = currList.filter(oldNote => oldNote.id !== note.id)
        break

      default:
        currList.unshift(note)
        newList = currList
    }

    setListOfNotes(newList)
    updateStorage(newList)
  }

  return (
    <MainContext.Provider value={{listOfNotes, updateList, modalOpen, toggleModal, modalInnerComponent, setModalInnerComponent, modalTransition}}>
      {children}
    </MainContext.Provider>
  )
}