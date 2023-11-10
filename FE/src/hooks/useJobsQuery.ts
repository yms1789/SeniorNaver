import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IJob } from "../components/JobList";

export async function fetchJobs(place: string) {
  try {
    const response = await axios.get<IJob>("/api/job/v1/list", {
      params: {
        pageNum: 0,
        workPlcNm: place,
        keyword: "",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
}

export async function fetchSearchJobs(input: string, places: string) {
  console.log("fetch", input);
  try {
    const response = await axios.get<IJob>("/api/job/v1/list", {
      params: {
        pageNum: 0,
        workPlcNm: places || "구미",
        keyword: input,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
}

export const useJobsQuery = (place: string) => {
  const query = useQuery({
    queryKey: ["jobs", place],
    queryFn: () => fetchJobs(place),
    refetchOnMount: false,
    suspense: true,
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
  });

  return query;
};
