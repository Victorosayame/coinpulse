"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Render a full-width table inside a horizontally scrollable container.
 *
 * @param className - Additional CSS classes applied to the table element
 * @param props - Other attributes and props forwarded to the underlying `table` element
 * @returns A `table` element merged with the provided classes and props, wrapped in a container that enables horizontal scrolling
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

/**
 * Renders a table header (<thead>) with a data-slot and default bottom-border styling for rows.
 *
 * Merges any provided `className` with the default `[&_tr]:border-b` rule and forwards remaining props to the `<thead>`.
 *
 * @returns The rendered `<thead>` element with `data-slot="table-header"`.
 */
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

/**
 * Renders a tbody element for the table body with default styling and forwarded props.
 *
 * Applies a data-slot of "table-body" and a default class that removes the bottom border from the last row;
 * merges any provided `className` and forwards all other props to the rendered element.
 *
 * @returns The rendered `tbody` element
 */
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

/**
 * Renders a table footer (<tfoot>) with a muted background, top border, and medium font weight.
 *
 * The element includes a data-slot="table-footer" attribute and removes the bottom border on the last row.
 *
 * @param className - Additional CSS class names to merge with the component's default styles
 * @returns The rendered `<tfoot>` element
 */
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table row (<tr>) with standardized row styling and forwards all props to the element.
 *
 * Applies hover and selected-state background, a bottom border, and color transition styles, and sets data-slot="table-row".
 *
 * @param className - Additional class names that are merged with the component's default row styles
 * @param props - Remaining props and attributes forwarded to the underlying `<tr>` element (including children)
 * @returns A `tr` element configured for use as a table row
 */
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table header cell (<th>) with standardized typography, spacing, alignment, and checkbox-aware adjustments.
 *
 * @param className - Additional class names to merge with the component's default styles
 * @returns The table header cell element (`<th>`) with the data-slot attribute, merged class names, and any other passed props
 */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Table cell element with standardized padding, vertical alignment, and checkbox-specific layout adjustments.
 *
 * @param className - Additional class names to merge with the component's default styles
 * @returns A `td` element with `data-slot="table-cell"`, merged class names, and all passed-through `td` props
 */
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table caption element with default caption styling and a data-slot attribute.
 *
 * @param className - Additional CSS classes to merge with the component's default caption styles
 * @returns The rendered `caption` element with merged class names and `data-slot="table-caption"`
 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}