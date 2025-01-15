import * as React from "react";
import { ChevronIcon, DotsIcon } from "@/icons/*";
import { ButtonProps, buttonVariants } from "@/ui/button";
import { Anchor } from "@/ui/anchor";
import { cn } from "str-merge";

export function Demo() {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <PaginationExamples
      currentPage={currentPage}
      totalPages={10}
      onPageChange={page => setCurrentPage(page)}
    />
  );
}

const PaginationExamples: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 4; // Jumlah halaman yang akan ditampilkan secara langsung

    let startPage = 1;
    let endPage = Math.min(totalPages, maxVisiblePages);

    // Geser rentang halaman jika currentPage lebih besar dari maxVisiblePages
    if (currentPage >= maxVisiblePages) {
      startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // Pastikan batas atas tidak melewati totalPages
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }

    // Tambahkan ellipsis di awal jika startPage lebih besar dari 1
    if (startPage > 1) {
      items.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Tambahkan halaman dalam rentang
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationButton
            isActive={i === currentPage}
            onClick={() => onPageChange(i)}
          >
            {i}
          </PaginationButton>
        </PaginationItem>
      );
    }

    // Tambahkan ellipsis di akhir jika endPage lebih kecil dari totalPages
    if (endPage < totalPages) {
      items.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination>
      <PaginationContent className="flex items-center gap-2">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          />
        </PaginationItem>
        {getPaginationItems()}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

// dibawah ini adalah yang lama
export const Pagination = React.forwardRef<
  HTMLElement,
  React.ComponentProps<"nav">
>(
  (
    {
      className,
      role = "navigation",
      "aria-label": al = "pagination",
      ...props
    },
    ref
  ) => (
    <nav
      {...{
        ref,
        role,
        "aria-label": al,
        className: cn("mx-auto flex w-full justify-center", className),
        ...props
      }}
    />
  )
);
Pagination.displayName = "Pagination";

export const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

export const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />);
PaginationItem.displayName = "PaginationItem";

export const PaginationButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { isActive?: boolean } & Pick<
      ButtonProps,
      "size" | "variant"
    >
>(
  (
    {
      className,
      isActive,
      type = "button",
      role = "button",
      variant,
      size = "icon",
      "aria-current": ac,
      ...props
    },
    ref
  ) => (
    <button
      {...{
        ref,
        type,
        role,
        "aria-current": ac || isActive ? "page" : undefined,
        className: cn(
          buttonVariants({
            variant: variant || (isActive ? "primitive" : "outline"),
            size
          }),
          className
        ),
        ...props
      }}
    />
  )
);
PaginationButton.displayName = "PaginationButton";

export const PaginationLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Anchor> & { isActive?: boolean } & Pick<
      ButtonProps,
      "size" | "variant"
    >
>(({ className, isActive, variant, size = "icon", ...props }, ref) => (
  <Anchor
    {...{
      ref,
      className: cn(
        buttonVariants({
          variant: variant || (isActive ? "primitive" : "outline"),
          size
        }),
        className
      ),
      ...props
    }}
  />
));
PaginationLink.displayName = "PaginationLink";

export const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof PaginationButton>
>(
  (
    {
      className,
      "aria-label": al = "Go to previous page",
      children,
      size = "default",
      ...props
    },
    ref
  ) => (
    <PaginationButton
      {...{
        ref,
        size,
        "aria-label": al,
        className: cn(
          "inline-flex h-9 items-center justify-center gap-1 whitespace-nowrap rounded-md px-4 py-2 pl-2.5 text-sm font-medium transition-colors hover:bg-background hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-constructive disabled:pointer-events-none disabled:opacity-50",
          className
        ),
        ...props
      }}
    >
      {children || (
        <>
          <ChevronIcon chevron="left" className="h-4 w-4" />
          <span>Previous</span>
        </>
      )}
    </PaginationButton>
  )
);
PaginationPrevious.displayName = "PaginationPrevious";

export const PaginationNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof PaginationButton>
>(
  (
    {
      className,
      "aria-label": al = "Go to next page",
      children,
      size = "default",
      ...props
    },
    ref
  ) => (
    <PaginationButton
      {...{
        ref,
        size,
        "aria-label": al,
        className: cn(
          "inline-flex h-9 items-center justify-center gap-1 whitespace-nowrap rounded-md px-4 py-2 pr-2.5 text-sm font-medium transition-colors hover:bg-background hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-constructive disabled:pointer-events-none disabled:opacity-50",
          className
        ),
        ...props
      }}
    >
      {children || (
        <>
          <span>Next</span>
          <ChevronIcon chevron="right" className="h-4 w-4" />
        </>
      )}
    </PaginationButton>
  )
);
PaginationNext.displayName = "PaginationNext";

export const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<"span">
>(
  (
    {
      className,
      "aria-hidden": ah = "true",
      "aria-label": al = "More pages",
      children,
      ...props
    },
    ref
  ) => (
    <span
      {...{
        ref,
        "aria-hidden": ah,
        "aria-label": al,
        className: cn("flex size-9 items-center justify-center", className),
        ...props
      }}
    >
      {children || <DotsIcon className="h-4 w-4" />}
    </span>
  )
);
PaginationEllipsis.displayName = "PaginationEllipsis";
