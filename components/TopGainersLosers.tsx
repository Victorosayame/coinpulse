import { fetcher } from "@/lib/coinqecko.actions";
import { TopGainersLosersFallback } from "./home/Fallback";
import TopGainersLosersClient from "./TopGainersLosersClient";
import type { TopGainersLosersAPI } from "@/types";

const TopGainersLosers = async () => {
  let data: TopGainersLosersAPI;

  try {
    data = await fetcher<TopGainersLosersAPI>(
      "/coins/top_gainers_losers?vs_currency=usd",
      undefined,
      300,
    );
    //this is only avaialble for paid plans
  } catch (error) {
    console.error("Error fetching top gainers/losers:", error);
    return <TopGainersLosersFallback />;
  }

  // pass fetched arrays down to client component for interactivity
  return (
    <TopGainersLosersClient
      gainers={data.top_gainers || []}
      losers={data.top_losers || []}
    />
  );
};

export default TopGainersLosers;
