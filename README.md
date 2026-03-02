# CoinPulse - Cryptocurrency Screener & Dashboard

A modern, high-performance cryptocurrency screener and dashboard application built with Next.js, React, TypeScript, and real-time WebSocket streaming. CoinPulse provides live market data, candlestick charts, and advanced trading analytics.

---

##  Project Overview

**CoinPulse** is a full-stack web application that delivers:
- Real-time cryptocurrency price tracking
- Interactive candlestick charts with period selection
- Top gainers/losers analysis
- Trending coins monitoring
- Market categories and data tables
- Live trading data via WebSocket
- Coin conversion interface
- Search functionality

The app leverages the **CoinGecko API** for historical and market data, and **CoinGecko WebSocket** for real-time streaming (paid plan features).

---

##  Technology Stack

### Frontend
- **Next.js 16.1.6** - React framework with App Router (server components, async components)
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **TailwindCSS 4** - Utility-first CSS framework
- **Lightweight Charts 5.1.0** - Professional candlestick charting library
- **Lucide React 0.575.0** - Icon library
- **Radix UI** - Unstyled, accessible component primitives
- **shadcn/ui** - Pre-built accessible components built on Radix UI

### Build & Development
- **ESLint 9** - Code linting
- **PostCSS 4** - CSS transformation

### API & Data
- **CoinGecko API** - Cryptocurrency market data
- **WebSocket** - Real-time price and trade streaming
- **query-string** - URL parameter parsing
- **clsx** & **tailwind-merge** - Dynamic class management

---

##  Project Structure

`
coinplus/
 app/                          # Next.js App Router (server-side pages)
    layout.tsx               # Root layout with global Header
    page.tsx                 # Home page with Suspense boundaries
    globals.css              # Global styles
    coins/
       page.tsx             # All coins listing page
       [id]/page.tsx        # Individual coin details page (dynamic route)

 components/                   # React components
    Header.tsx               # Navigation header
    DataTable.tsx            # Generic table component (reusable)
    CandlestickChart.tsx     # Lightweight Charts integration
    LiveDataWrapper.tsx      # Real-time data container
    Converter.tsx            # Currency converter component
    CoinHeader.tsx           # Coin info display
    CoinsPagination.tsx      # Pagination controls
    TopGainersLosers.tsx     # Top gainers/losers server component
    TopGainersLosersClient.tsx # Top gainers/losers client component
    home/
       Categories.tsx       # Market categories table
       CoinOverview.tsx     # Bitcoin overview section
       TrendingCoins.tsx    # Trending coins table
       Fallback.tsx         # Suspense fallback skeletons
    ui/                      # shadcn/ui components
        badge.tsx
        button.tsx
        input.tsx
        pagination.tsx
        select.tsx
        separator.tsx
        table.tsx

 hooks/                        # Custom React hooks
    useCoinGeckoWebSocket.ts # WebSocket connection & real-time data

 lib/                         # Utilities & server actions
    coinqecko.actions.ts    # API fetcher & data helpers (server)
    utils.ts                 # Helper functions (formatting, etc.)

 public/                      # Static assets
    assets/

 types.d.ts                   # Global type definitions
 constants.ts                 # App constants & configurations
 tsconfig.json                # TypeScript configuration
 next.config.ts               # Next.js configuration
 tailwind.config.js           # Tailwind CSS configuration
 postcss.config.mjs           # PostCSS configuration
 eslint.config.mjs            # ESLint configuration
 package.json                 # Dependencies & scripts

\\\

---

##  How the App Was Built (Step-by-Step)

### Step 1: Project Initialization
1. Created a Next.js 16 project with TypeScript support
   - Configured Next.js App Router for server components
   - Set up path aliases (@/*) for clean imports
2. Configured TailwindCSS 4 and PostCSS for styling
3. Set up \
ext.config.ts\ to allow external image sources (CoinGecko CDN)

### Step 2: Type System Setup (\	ypes.d.ts\)
1. Created global type definitions for:
   - **API Response Types**: CoinMarketData, CoinDetailsData, TrendingCoin, Category
   - **Component Props**: CandlestickChartProps, LiveDataProps, DataTableProps
   - **Domain Models**: OHLCData, Trade, ExtendedPriceData, WebSocketMessage
   - **Utilities**: QueryParams, PoolData, CoinGeckoErrorBody
2. Configured TypeScript with \strict: true\ for full type safety
3. Made types ambient (no export) so they're globally available

### Step 3: UI Component System
1. Installed shadcn/ui and Radix UI for accessible, pre-built components
2. Created reusable generic components:
   - **DataTable<T>** - Generic table accepting any data type with custom cell renderers
   - **CandlestickChart** - Chart component with period selection (1D-1Y)
   - **Pagination** - Navigation component with page calculation
3. Created Fallback/Skeleton components for Suspense boundaries
4. Used TailwindCSS utility classes for all styling (responsive, dark mode)

### Step 4: API Layer (\lib/coinqecko.actions.ts\)
1. Created \etcher<T>()\ server action for type-safe API calls
   - Generic parameter ensures response type matches usage
   - Automatic error handling with proper error messages
   - ISR (Incremental Static Regeneration) with \evalidate\ parameter
2. Built \getPools()\ helper for blockchain pool data
   - Fallback logic for missing network/contract data
   - Two-tier API calls (specific vs. search)
3. Integrated CoinGecko API with environment variables
   - Base URL from \COINGECKO_BASE_URL\
   - API key from \COINGECKO_API_KEY\

### Step 5: Real-Time Data with WebSocket (\hooks/useCoinGeckoWebSocket.ts\)
1. Developed custom hook for WebSocket connection management
2. Implemented message parsing with error handling for malformed JSON
3. Managed real-time data updates:
   - **Price Updates** (ExtendedPriceData) - USD value changes
   - **Trade Streams** (Trade[]) - Individual buy/sell transactions
   - **OHLCV Data** (OHLCData) - Open, High, Low, Close, Volume
4. Handled WebSocket lifecycle (connect, subscribe, message parsing, cleanup)
5. Used useRef to prevent multiple connections on re-renders

### Step 6: Page Architecture

#### Home Page (\pp/page.tsx\)
1. Layout with Suspense boundaries for independent rendering
   - CoinOverview (Bitcoin details)
   - TrendingCoins (Top trending table)
   - Categories (Market categories table)
2. Fallback components for loading states
3. Allows streaming of data as it becomes available

#### All Coins Page (\pp/coins/page.tsx\)
1. Server-side fetching of coins market data via \etcher<CoinMarketData[]>()\
2. Dynamic DataTable with custom column definitions
3. Type-safe column renderers with DataTableColumn<CoinMarketData>
4. Pagination controls using buildPageNumbers utility
5. Search parameter integration from URL

#### Coin Details Page (\pp/coins/[id]/page.tsx\)
1. Dynamic route with \[id]\ parameter using Next.js 15+ pattern
2. Parallel data fetching (coin data + OHLC data via Promise.all)
3. LiveDataWrapper for real-time updates
4. Embedded candlestick chart with live mode
5. Converter component for currency conversion
6. Details section with formatted data and external links

### Step 7: Component Composition Pattern

#### Server Components (Default in App Router)
- Categories, CoinOverview, TrendingCoins, TopGainersLosers
- Fetched data during build/request time
- Rendered as HTML on server
- Streamed to client via Suspense boundaries
- No client-side interactivity

#### Client Components (\"use client"\)
- LiveDataWrapper, CandlestickChart, DataTable, Header, Pagination
- Interactive features: onClick, onChange, useState, useEffect
- Real-time state updates
- Event handlers and user input

### Step 8: Internationalization & Formatting (\lib/utils.ts\)
1. Created utility functions for data formatting:
   - \ormatCurrency()\ - Numbers as USD with symbol
   - \ormatPercentage()\ - Percentages with color indicators
   - \	imeAgo()\ - Relative time formatting (e.g., "2 hours ago")
   - \cn()\ - Class name merging (clsx + tailwind-merge)
2. Color utilities: conditional Tailwind classes based on data
3. Number utilities: locale-aware number formatting

### Step 9: Constants & Configuration (\constants.ts\)
1. Defined chart styling constants:
   - Colors (candleUp, candleDown, grid, border, text)
   - Layout (fonts, spacing, sizing)
   - Crosshair configuration
2. Created period configuration:
   - Daily (1d, hourly intervals)
   - Weekly, Monthly, Quarterly, Semi-annual, Annual
3. Defined reusable button/option constants:
   - PERIOD_BUTTONS - UI controls for chart periods
   - LIVE_INTERVAL_BUTTONS - Real-time update frequency

### Step 10: Environment & Deployment Setup
1. Configured environment variables:
   - Server-side: COINGECKO_BASE_URL, COINGECKO_API_KEY
   - Client-side (public): NEXT_PUBLIC_COINGECKO_*
2. Built for production with \
pm run build\
3. Optimized images with Next.js Image component
4. Configured CORS and external image domains in next.config.ts

---

##  Data Flow Architecture

With step-by-step comment documentation, all TypeScript, ESLint and type errors have been fixed. The application is now production-ready with full type safety.

**Last Updated:** March 2, 2026  
**Version:** 1.0.0  
**Status:** Production Ready