import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotesClient from "./notes/Notes.client";
import { fetchNotes } from "./../services/noteService";

export default async function NotesPage({
  searchParams,
}: { searchParams: { page?: string; search?: string } }) {
  const page = Number(searchParams?.page ?? "1");
  const search = String(searchParams?.search ?? "");

  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient initialPage={page} initialSearch={search} />
    </HydrationBoundary>
  );
}
