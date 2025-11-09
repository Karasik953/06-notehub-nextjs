"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useFetchNotes } from "../hooks/useFetchNotes";
import NoteList from "../components/NoteList/NoteList";
import Pagination from "../components/Pagination/Pagination";
import SearchBox from "../components/SearchBox/SearchBox";
import Modal from "../components/Modal/Modal";
import NoteForm from "../components/NoteForm/NoteForm";
import css from "./Notes.module.css";

type Props = { initialPage: number; initialSearch: string };

export default function NotesClient({ initialPage, initialSearch }: Props) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 300);
  const { data, isLoading, isError } = useFetchNotes(page, debouncedSearch);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const totalPages = data?.totalPages ?? 1;
  const notes = data?.notes ?? [];

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
      {/* Для дебагу:
      {!isLoading && !isError && <pre>{JSON.stringify(data, null, 2)}</pre>}
      */}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
