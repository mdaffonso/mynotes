import { ReactNode } from "react"
import { NoteListType } from "./NoteListType";
import { NoteType } from "./NoteType";


export interface MainContextType {
  listOfNotes: NoteListType,
  updateList: (value: NoteType, action: string) => void
  modalOpen: boolean,
  toggleModal: () => void,
  modalInnerComponent: ReactNode,
  setModalInnerComponent: (value: (prevState: ReactNode) => ReactNode) => void
  modalTransition: boolean
}