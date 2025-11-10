"use client"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { useFetchNotes } from "../../hooks/useFetchNotes"
import NoteList from "../NoteList/NoteList"
import Pagination from "../Pagination/Pagination"
import SearchBox from "../SearchBox/SearchBox"
import Modal from "../Modal/Modal"
import NoteForm from "../NoteForm/NoteForm"
import css from "./App.module.css"

export default function App() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [debouncedSearch] = useDebounce(search, 300)

  const { data, isLoading, isError } = useFetchNotes(page, debouncedSearch)


  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const totalPages = data?.totalPages ?? 1
  const notes = data?.notes ?? []

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Something went wrong 😢</p>}

      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  )
}
