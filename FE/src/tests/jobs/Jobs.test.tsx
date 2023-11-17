import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { renderHook, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { useJobsQuery } from "../../hooks/useJobsQuery";
import { setupServer } from "msw/node";
import { handlers } from "../../mocks/handlers";

const queryCache = new QueryCache();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryCache.clear();
});
afterAll(() => server.close());

describe("일자리 페이지", () => {
  it("일자리 리스트 잘 가져오는지 테스트", async () => {
    // Fetches Page 0
    const { result } = renderHook(() => useJobsQuery("서울"), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.items.item.length).toBe(2);
  });
});
