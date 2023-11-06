import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IJob } from "../components/JobList";

export async function fetchJobs(place: string) {
  try {
    const response = await axios.get<IJob>("/test/jobs", {
      params: {
        workplace: place,
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

export async function fetchSearchJobs(
  input: string,
  places: string,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
) {
  console.log("fetch", input);
  setIsLoading?.(true);
  try {
    const response = await axios.get<IJob>("/test/jobs", {
      params: {
        workplace: places || "구미",
        keyword: input,
      },
    });
    setIsLoading?.(false);
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
