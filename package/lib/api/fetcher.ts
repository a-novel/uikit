import { APIError, Config, FetchRequest, FetchRequestGet, FetchRequestPost, FetchResponse } from "./types";
import { mergeURLs, parseBody, parseHeaders } from "./utils";

/**
 * Extends the default {@link fetch} API to be parameterized. Similar to libraries like axios, but simpler, and using
 * native APIs.
 *
 * It adds some axios convenience, such as throwing errors on non-200 statuses, and automatic response parsing.
 */
export class Highway {
  // Instance parameters, to be applied to each request.
  private readonly base?: URL;
  private readonly headers?: HeadersInit;
  private readonly requestInit?: RequestInit;

  constructor({ base, headers, requestInit }: Config = {}) {
    if (base) {
      // If a base URL is provided, it MUST be a full valid absolute URL.
      this.base = new URL(base);
    }
    this.headers = headers;
    this.requestInit = requestInit;
  }

  handle = async <Req extends FetchRequest>(req: Req): Promise<FetchResponse<Req>> => {
    // Merge parameters together, and form the request API configuration.
    const params: RequestInit = { ...(this.requestInit || {}), ...(req.requestInit || {}), method: req.method };

    const headers = parseHeaders(this.headers, req.headers);
    if (headers != null) {
      params.headers = headers;
    }

    const body = parseBody(req);
    if (body != null) {
      params.body = body;
    }

    const path = mergeURLs(req.path, this.base);
    for (let [key, val] of new URLSearchParams(req.params).entries()) {
      path.searchParams.append(key, val);
    }

    // Perform the request with native API.
    const response = await fetch(path, params);

    // Prevent successful responses, if the status code is not a success code.
    if (!response.ok) {
      if ("soft" in req && req.soft) {
        return response as FetchResponse<Req>;
      }

      throw new APIError(response);
    }

    // Don't attempt to parse the body if none is returned.
    if (response.body == null) {
      if (req.must) {
        throw new Error("api call returned an empty response body");
      }

      return (req.resolver ? undefined : response) as FetchResponse<Req>;
    }

    // As of today (03 2023), type inference works well when calling the function. It seems, however, that
    // typescript struggles to properly infer complex types within guard clauses. Maybe it will work better
    // in future releases, but for now, the "as ResponseType<PReq>" is required, to avoid typescript errors.
    switch (req.resolver) {
      case "text":
        return (await response.text()) as FetchResponse<Req>;
      case "json":
        return (await response.json()) as FetchResponse<Req>;
      case "blob":
        return (await response.blob()) as FetchResponse<Req>;
      case "arrayBuffer":
        return (await response.arrayBuffer()) as FetchResponse<Req>;
      case "formData":
        return (await response.formData()) as FetchResponse<Req>;
      case "void":
        // https://github.com/nodejs/undici#garbage-collection
        await response.text();
        return undefined as FetchResponse<Req>;
      default:
        return response as FetchResponse<Req>;
    }
  };

  get = <Req extends FetchRequestGet>(params: Req) =>
    this.handle({ ...params, method: "GET" }) as Promise<FetchResponse<Req>>;
  post = <Req extends FetchRequestPost>(params: Req) =>
    this.handle({ ...params, method: "POST" }) as Promise<FetchResponse<Req>>;
  put = <Req extends FetchRequestPost>(params: Req) =>
    this.handle({ ...params, method: "PUT" }) as Promise<FetchResponse<Req>>;
  patch = <Req extends FetchRequestPost>(params: Req) =>
    this.handle({ ...params, method: "PATCH" }) as Promise<FetchResponse<Req>>;
  destroy = <Req extends FetchRequestPost>(params: Req) =>
    this.handle({ ...params, method: "DELETE" }) as Promise<FetchResponse<Req>>;

  createInstance = ({ base, headers, requestInit }: Config = {}): Highway =>
    new Highway({
      base: base ? mergeURLs(base, this.base) : this.base,
      headers: { ...(this.headers || {}), ...(headers || {}) },
      requestInit: { ...(this.requestInit || {}), ...(requestInit || {}) },
    });
}

const fetcher = new Highway();

export const createInstance = fetcher.createInstance;
