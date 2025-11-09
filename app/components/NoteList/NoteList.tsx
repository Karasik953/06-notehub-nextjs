import Link from "next/link";
import type { Note } from "../../types/note";
import { useDeleteNote } from "../../hooks/useDeleteNote";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const deleteNoteMutation = useDeleteNote();

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            {/* 🔗 Додаємо лінк на сторінку деталей */}
            <Link href={`/notes/${note.id}`} className={css.viewLink}>
              View details
            </Link>

            <button
              className={css.button}
              onClick={() => deleteNoteMutation.mutate(note.id)}
              disabled={deleteNoteMutation.isPending}
            >
              {deleteNoteMutation.isPending ? "..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
