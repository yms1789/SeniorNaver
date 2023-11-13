import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { IJob } from "../components/RenderJobList";

export async function fetchJobs(pageNum: number, place: string, input: string) {
  try {
    const response = await axios.get<IJob>("/api/job/v1/list", {
      params: {
        pageNum: pageNum,
        workPlcNm: place,
        keyword: input,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
}

export const useJobsQuery = (place: string, input?: string) => {
  const query = useInfiniteQuery({
    queryKey: ["jobs", place],
    queryFn: ({ pageParam = 0 }) => fetchJobs(pageParam, place, input || ""),
    getNextPageParam: lastPage => {
      // console.log("lastPage", lastPage);
      // console.log("allPage", allPages);
      return lastPage?.page! < lastPage?.totalPage! ? lastPage?.page! + 1 : undefined;
    },
    suspense: true,
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
  });

  return query;
};
