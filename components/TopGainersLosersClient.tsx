"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TrendingDown, TrendingUp } from "lucide-react";

import { Button } from "./ui/button";
import DataTable from "./DataTable";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import type { TopGainersLosersResponse } from "@/types";

interface TopGainersLosersClientProps {
  gainers: TopGainersLosersResponse[];
  losers: TopGainersLosersResponse[];
}

export default function TopGainersLosersClient({
  gainers,
  losers,
}: TopGainersLosersClientProps) {
  const [active, setActive] = useState<"gainers" | "losers">("gainers");

  const columns = [
    {
      header: "Name",
      cellClassName: "name-cell",
      cell: (coin: TopGainersLosersResponse) => (
        <Link href={`/coins/${coin.id}`} className="flex items-center gap-2">
          <Image src={coin.image} alt={coin.name} width={36} height={36} />
          <p>{coin.name}</p>
        </Link>
      ),
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin: TopGainersLosersResponse) => formatCurrency(coin.usd),
    },
    {
      header: "24h Change",
      cellClassName: "name-cell",
      cell: (coin: TopGainersLosersResponse) => {
        const isUp = coin.usd_24h_change > 0;
        return (
          <div
            className={cn(
              "price-change",
              isUp ? "text-green-500" : "text-red-500",
            )}
          >
            <p className="flex items-center">
              {formatPercentage(coin.usd_24h_change)}
              {isUp ? (
                <TrendingUp width={16} height={16} />
              ) : (
                <TrendingDown width={16} height={16} />
              )}
            </p>
          </div>
        );
      },
    },
    {
      header: "Volume (24h)",
      cellClassName: "price-cell",
      cell: (coin: TopGainersLosersResponse) =>
        formatCurrency(coin.usd_24h_vol),
    },
    {
      header: "Rank",
      cellClassName: "price-cell",
      cell: (coin: TopGainersLosersResponse) => `#${coin.market_cap_rank}`,
    },
  ];

  const data = active === "gainers" ? gainers : losers;

  return (
    <div id="top-gainers-losers">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={active === "gainers" ? "default" : "outline"}
          onClick={() => setActive("gainers")}
        >
          Top Gainers
        </Button>
        <Button
          variant={active === "losers" ? "default" : "outline"}
          onClick={() => setActive("losers")}
        >
          Top Losers
        </Button>
      </div>

      <h4 className="mb-2">
        {active === "gainers" ? "Top Gainers" : "Top Losers"}
      </h4>
      <DataTable
        data={data}
        columns={columns as any}
        rowKey={(coin) => coin.id}
        tableClassName="top-gainers-losers-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  );
}
