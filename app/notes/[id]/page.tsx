// app/notes/[id]/page.tsx
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
// Якщо папка `lib` лежить поряд з `app` у корені проєкту:
import { fetchNoteById } from "../../../lib/api";
// Якщо твій NoteDetails.client.tsx лежить у app/notes/, піднімаємося на рівень вище:
import NoteDetailsClient from "./NoteDetails.client";

// Вимога ментора: params як Promise і await
type Params = Promise<{ id: string }>;

export default async function NoteDetailsPage({
  params,
}: { params: Params }) {
  const { id } = await params; // ← головна правка

  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
