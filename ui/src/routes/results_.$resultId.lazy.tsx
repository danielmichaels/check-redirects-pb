import { createLazyFileRoute } from '@tanstack/react-router'
import {useEffect} from "react";
import {pb} from "~/lib/pocketbase";
import {Collections, SearchesResponse} from "~/lib/pocketbase-types";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {ResultLayout} from "~/components/ResultLayout";
import {FinalResult} from "~/components/FinalResult";
import {SummaryTable} from "~/components/SummaryTable";
import {ResultAnalysis} from "~/components/ResultAnalysis";

export const Route = createLazyFileRoute('/results_/$resultId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { resultId } = Route.useParams();
  const queryClient = useQueryClient();

  const searchQuery = useQuery({
    queryKey: ["searches", resultId],
    queryFn: async () => {
      return await pb.collection(Collections.Searches).getOne<SearchesResponse>(resultId, {
        sort: "-created",
        expand: "hops_via_search_id",
      });
    },
  });

  useEffect(() => {
    pb.collection(Collections.Searches).subscribe(resultId, () => {
      queryClient.invalidateQueries({ queryKey: ["searches", resultId] });
    }, {
      expand: "hops_via_search_id"
    });

    return () => {
      pb.collection(Collections.Searches).unsubscribe(resultId);
    };
  }, [queryClient]);


  if (searchQuery.isLoading || !searchQuery.data) {
    return (
        <ResultLayout>
        <div>Loading...</div>
        </ResultLayout>
    )
  }
  if (searchQuery.error || searchQuery.error) {
    return (
        <ResultLayout>
        <div>Error: {searchQuery.error?.message}</div>;
        </ResultLayout>
    )
  }

  return (
      <>
        <ResultLayout>
            <FinalResult resultArray={searchQuery.data} />
            <SummaryTable hops={searchQuery.data.expand.hops_via_search_id} />
            <ResultAnalysis hops={searchQuery.data.expand.hops_via_search_id} />
        </ResultLayout>
      </>
  )
}
