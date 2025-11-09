export interface Note {
  id: string
  title: string
  content: string
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo"
  createdAt: string
  updatedAt: string
}

export interface CreateNoteDto {
  title: string
  content: string
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo"
}
  