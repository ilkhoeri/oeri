"use client";
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "str-merge";

type Unstyled = {
  unstyled?: boolean;
};

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & Unstyled>(
  ({ unstyled, className, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(!unstyled && "inline-flex items-center justify-center rounded-md p-1 text-muted-foreground", className)}
      {...props}
    />
  )
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & Unstyled>(
  ({ unstyled, className, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        !unstyled &&
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-color data-[state=active]:shadow-sm",
        className
      )}
      {...props}
    />
  )
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & Unstyled>(
  ({ unstyled, className, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(!unstyled && "mt-8 overflow-hidden focus-visible:outline-none focus-visible:ring-0", className)}
      {...props}
    />
  )
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
