"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

import css from "./NotePage.module.css"
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useFetchNotes } from "@/hooks/useFetchNotes";

type NotesClientProps = {
  initialPage: number;
  initialSearch: string;
};

export default function NotesClient({
  initialPage,
  initialSearch,
}: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // debounce для пошуку
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  // тут важливо: useFetchNotes має використовувати той самий queryKey,
  // що й prefetch у page.tsx
  const { data, isLoading, isError } = useFetchNotes(
    debouncedSearch,
    currentPage
  );

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // при новому пошуку повертаємось на 1 сторінку
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearchChange={handleSearchChange} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
