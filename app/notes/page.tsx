// app/notes/page.tsx  ← SERVER COMPONENT (без "use client")
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "../services/noteService";

type PageProps = {
  searchParams: { page?: string; search?: string };
};

export default async function NotesPage({ searchParams }: PageProps) {
  const initialPage = Number(searchParams.page ?? "1");
  const initialSearch = String(searchParams.search ?? "");

  const qc = new QueryClient();

  // ВАЖЛИВО: queryKey має бути ТОЧНО таким самим, як у useFetchNotes
  const queryKey = ["notes", initialPage, initialSearch];

  await qc.prefetchQuery({
    queryKey,
    queryFn: () => fetchNotes(initialPage, initialSearch),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient initialPage={initialPage} initialSearch={initialSearch} />
    </HydrationBoundary>
  );
}
