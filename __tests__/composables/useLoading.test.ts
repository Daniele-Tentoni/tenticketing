import { expect, test } from "vitest";
import useLoading from "../../composables/useLoading";

test("useLoading", () => {
  const loading = useLoading();
  expect(loading.value).toBe(false);
})