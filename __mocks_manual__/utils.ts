import { APIError } from "@lib/api";
import "jest-environment-jsdom";
import "whatwg-fetch";

interface useFetchMockParams {
  response?: Response;
  error?: any;
  delay?: number;
}

export const newFetchResponse = (body: any, init?: ResponseInit) =>
  new Response(JSON.stringify(body), { status: 200, statusText: "ok", ...(init || {}) });

export const newAPIError = (status: number): APIError =>
  new APIError(new Response(null, { status, statusText: "error" }));

export const newFetchMock = ({ response, error, delay }: useFetchMockParams) =>
  jest.fn().mockImplementation(async (input: RequestInfo | URL, init?: RequestInit): Promise<Response | undefined> => {
    if (delay) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    if (error != null) {
      throw error;
    }

    return response?.clone();
  });
