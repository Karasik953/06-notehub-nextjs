import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "../../lib/api";
import NoteDetailsClient from "../NoteDetails.client";

type Props = { params: { id: string } };

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = params;

  const qc = new QueryClient();
  const queryKey = ["note", id];

  await qc.prefetchQuery({
    queryKey,
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
