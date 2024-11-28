import { twMerge, cvx, type VariantsType } from "str-merge";
import { SetProps } from "../__set_props";

const classesVariants = cvx({
  // assign values that is definitely returned
  assign: "bg-muted rounded-sm px-2 border flex items-center justify-center",
  variants: {
    variant: {
      bold: "font-bold",
      italic: "font-italic",
      semibold: "font-semibold",
      light: "font-light"
    },
    color: {
      blue: "text-blue-600",
      green: "text-green-700",
      red: "text-red-500",
      purple: "text-purple-500"
    },
    size: {
      sm: "h-4",
      md: "h-6",
      lg: "h-10",
      xl: "h-14"
    }
  },
  // determine the variance value by default
  defaultVariants: {
    variant: "bold",
    color: "blue",
    size: "lg"
  }
});

type MyVariantsType = VariantsType<typeof classesVariants>;
interface ClassesProps extends MyVariantsType {
  unstyled?: boolean;
  className?: string;
}
export function classes(props: ClassesProps) {
  const { className, unstyled, ...rest } = props;
  return {
    className: twMerge(!unstyled && classesVariants({ ...rest }), className)
  };
}

export function Demo(props: ClassesProps) {
  return (
    <div className="flex flex-col gap-4">
      <SetProps.Comment title="// usage defaultVariants and passed props" />
      <div {...classes(props)}>passed props</div>

      <SetProps.Comment title="// cleaning class with unstyled argument" />
      <div {...classes({ unstyled: true })}>unstyled</div>

      <SetProps.Comment title="// usage defaultVariants without defined variant" />
      <div className={classesVariants()}>without defined variant</div>

      <SetProps.Comment title={`// classes({ color: 'red', size: 'md' })`} />
      <div className={classesVariants({ color: "red", size: "lg" })}>
        defined variant
      </div>

      <SetProps.Comment title={`// usage with twMerge() scope`} />
      <div
        className={twMerge(
          classesVariants({ color: "red", size: "md" }),
          "bg-black/60 dark:bg-white/60 text-white dark:text-black font-extrabold border-0"
        )}>
        MY COMPONENT
      </div>
    </div>
  );
}
