import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api"; // або як у тебе називається
import NotesClient from "./Notes.client";

const NotesPage = async () => {
  const initialPage = 1;
  const initialSearch = "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", initialSearch, initialPage],
    queryFn: () => fetchNotes(initialSearch, initialPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        initialPage={initialPage}
        initialSearch={initialSearch}
      />
    </HydrationBoundary>
  );
};

export default NotesPage;
