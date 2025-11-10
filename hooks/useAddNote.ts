// src/hooks/useAddNote.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "../services/noteService"
import type { CreateNoteDto } from "../types/note"

export const useAddNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (note: CreateNoteDto) => createNote(note),


    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"], exact: false })
    },


    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"], exact: false })
    },
  })
}
