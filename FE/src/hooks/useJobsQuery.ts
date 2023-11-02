import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchJobs(place: string, input?: string) {
  try {
    const response = await axios.get("/test/jobs", {
      params: {
        workplace: place,
        keyword: input || "",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
}

export const useJobsQuery = (place: string, input?: string) => {
  const query = useQuery({
    queryKey: ["jobs", place],
    queryFn: () => fetchJobs(place, input),
    refetchOnMount: false,
    suspense: true,
    useErrorBoundary: true,
    // retry: false,
  });

  return query;
};
