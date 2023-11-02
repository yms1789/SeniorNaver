import "@testing-library/jest-dom";

import { server } from "./mocks/server";
import { queryCache } from "./tests/places/Places.test";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryCache.clear();
});
afterAll(() => server.close());
