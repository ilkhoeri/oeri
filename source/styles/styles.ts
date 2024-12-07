import {
  cnx,
  cvx,
  twMerge,
  type VariantsType,
  type ClassValue
} from "str-merge";

export const compoundStyle = cvx({
  variants: {
    cards: {
      box: "flex w-full flex-col items-center rounded-lg border bg-card p-6 text-card-foreground shadow-md transition-colors [@media(hover:hover)]:hover:bg-muted/25 dark:hover:bg-muted/45"
    },
    button: {
      default:
        "transition-colors rounded-md font-medium text-span bg-color text-background border border-background [@media(hover:hover)]:hover:bg-color/90 disabled:opacity-50",
      destructive:
        "transition-colors rounded-md font-medium text-span bg-destructive text-white [@media(hover:hover)]:hover:bg-destructive-foreground",
      constructive:
        "transition-colors rounded-md font-medium text-span bg-constructive text-white [@media(hover:hover)]:hover:bg-constructive-foreground",
      conservative:
        "transition-colors rounded-md font-medium text-span bg-conservative text-white [@media(hover:hover)]:hover:bg-conservative-foreground",
      primitive:
        "transition-colors rounded-md font-medium text-span bg-primitive-foreground/35 text-color border border-primitive-emphasis [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-primitive/40",
      outline:
        "transition-colors rounded-md font-medium text-span border bg-background text-muted-foreground [@media(hover:hover)]:hover:bg-muted [@media(hover:hover)]:hover:text-color",
      link: "transition-colors rounded-md font-medium text-span text-color underline-offset-4 [@media(hover:hover)]:hover:text-constructive [@media(hover:hover)]:hover:underline"
    },
    toggle: {
      group: "flex items-center",
      item: "inline-flex items-center justify-center rounded-md ring-offset-background transition-colors text-muted-foreground [@media(hover:hover)]:hover:bg-muted/75 [@media(hover:hover)]:hover:text-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:text-color"
    },
    input: {
      text: "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    },
    theme: {
      default: "bg-transparent",
      outline:
        "border bg-transparent [@media(hover:hover)]:hover:bg-muted [@media(hover:hover)]:hover:text-color"
    },
    size: {
      default: "h-10 px-3",
      sm: "h-9 px-2.5",
      lg: "h-11 px-5",
      "icon-sm": "sizer [--sz:36px] p-1",
      "icon-xs": "sizer [--sz:32px] p-0.5"
    }
  }
});

export default function globalStyle(
  variants: VariantsType<typeof compoundStyle>,
  ...inputs: ClassValue[]
) {
  return twMerge(compoundStyle(variants), cnx(...inputs));
}
