"use server"
//a function that makes us easily make every endpoint call

import qs from "query-string";

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if(!BASE_URL) throw new Error("Could not get base url")
if(!API_KEY) throw new Error("Could not get api key")

/**
 * Perform an HTTP GET to the configured CoinGecko base URL for the given endpoint and return the parsed JSON response.
 *
 * @param endpoint - Path or resource to append to the configured base URL (e.g., "coins/markets")
 * @param params - Query parameters to include; keys with empty string or null values are omitted
 * @param revalidate - Number of seconds to use for fetch cache revalidation
 * @returns The parsed response body typed as `T`
 * @throws Error when the response has a non-OK status; message includes the HTTP status and any error message from the response body
 */
export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60,
): Promise<T> {
  const url = qs.stringifyUrl({
    url: `${BASE_URL}/${endpoint}`,
    query: params,
  }, { skipEmptyString: true, skipNull: true });

  //make a call to the url
  const response = await fetch(url, {
    headers: {
      // "x-cg-pro-api-key": API_KEY,
      "content-Type": "application/json",
    } as Record<string, string>,
    next: { revalidate }
  });

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}))

    throw new Error(`API Error: ${response.status}: ${errorBody.error || response.statusText}`);
  }

  return response.json();
}