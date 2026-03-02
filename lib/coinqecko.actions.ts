/**
 * COINGECKO API INTEGRATION (lib/coinqecko.actions.ts)
 *
 * This file handles all API communication with the CoinGecko API.
 * Uses Next.js "use server" directive to run only on the server.
 *
 * KEY FEATURES:
 * 1. Type-safe API calls with TypeScript generics
 * 2. Automatic error handling and recovery
 * 3. ISR (Incremental Static Regeneration) for caching
 * 4. Environment variable configuration
 * 5. Two-tier blockchain pool data fetching
 *
 * BUILD PROCESS - STEP 4:
 * - Created fetcher<T>() for all API calls
 * - Built getPools() helper for blockchain data
 * - Integrated environment variables
 * - Set up error handling with fallback values
 *
 * ARCHITECTURE:
 * Server Action → fetcher<T>() → CoinGecko API → Typed Response
 */

"use server";

import qs from "query-string";

// Load environment variables configured in .env.local
const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

// Validate environment variables exist at startup
// Fail fast if configuration is missing
if (!BASE_URL) throw new Error("Could not get base url");
if (!API_KEY) throw new Error("Could not get api key");

/**
 * FETCHER FUNCTION - Type-Safe API Calls
 *
 * Generic server action for all API calls to CoinGecko.
 * Uses TypeScript generic parameter <T> to ensure type safety.
 *
 * PARAMETERS:
 * @param endpoint - API endpoint (e.g., "/coins/markets")
 * @param params - Query parameters (pagination, sorting, etc.)
 * @param revalidate - ISR cache time in seconds (default 60)
 *
 * RETURNS Promise<T> - Parsed JSON response typed as T
 *
 * FEATURES:
 * - Type-safe responses with generics
 * - Automatic error handling and recovery
 * - ISR caching for performance
 * - Environment variable configuration
 */
export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60,
): Promise<T> {
  // Build complete URL with query string parameters
  // query-string library handles proper URL encoding
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint.replace(/^\//, "")}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true },
  );

  // Make HTTP request to CoinGecko API
  // "next: { revalidate }" enables ISR caching for performance
  const response = await fetch(url, {
    headers: {
      // Demo plan API key (use x-cg-pro-api-key for paid plan)
      "x-cg-demo-api-key": API_KEY,
      "content-Type": "application/json",
    } as Record<string, string>,
    // ISR: Cache for `revalidate` seconds, then revalidate on next request
    next: { revalidate },
  });

  // Check if API response was successful (2xx status code)
  if (!response.ok) {
    // Attempt to extract error details from API response
    const errorBody: CoinGeckoErrorBody = await response
      .json()
      .catch(() => ({}));

    // Throw descriptive error that components can catch
    throw new Error(
      `API Error: ${response.status}: ${errorBody.error || response.statusText}`,
    );
  }

  // Parse response as JSON and cast to type T
  // TypeScript generics ensure return type matches expected type
  return response.json();
}

/**
 * GETPOOLS FUNCTION - Blockchain Pool Helper
 *
 * Fetches liquidity pool data from CoinGecko's onchain API.
 * Provides fallback mechanism if data is unavailable.
 *
 * TWO-TIER STRATEGY:
 * 1. Specific: network + contract address lookup
 * 2. Generic: search by coin ID (if tier 1 fails)
 * 3. Fallback: empty PoolData object (if all fail)
 */
export async function getPools(
  id: string,
  network?: string | null,
  contractAddress?: string | null,
): Promise<PoolData> {
  // Fallback object returned if API calls fail
  const fallback: PoolData = {
    id: "",
    address: "",
    name: "",
    network: "",
  };

  // TIER 1: Specific network + contract lookup
  if (network && contractAddress) {
    try {
      const poolData = await fetcher<{ data: PoolData[] }>(
        `/onchain/networks/${network}/tokens/${contractAddress}/pools`,
      );

      // Return first pool found or fallback if empty
      return poolData.data?.[0] ?? fallback;
    } catch {
      // If specific lookup fails, continue to generic search
    }
  }

  // TIER 2: Generic search by coin ID (fallback if tier 1 failed)
  try {
    const poolData = await fetcher<{ data: PoolData[] }>(
      "/onchain/search/pools",
      { query: id },
    );

    // Return first pool found or fallback if empty
    return poolData.data?.[0] ?? fallback;
  } catch {
    // If all API calls fail, return empty fallback object
    return fallback;
  }
}
