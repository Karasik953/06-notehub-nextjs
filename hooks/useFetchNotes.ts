import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { fetchNotes } from "../services/noteService"

export const useFetchNotes = (page: number, search: string) => {
  return useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: keepPreviousData,
  })
}
