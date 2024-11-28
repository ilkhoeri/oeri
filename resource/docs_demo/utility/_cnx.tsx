/*eslint-disable*/
import { twMerge, cnx, type ClassValue } from "str-merge";
import { SetProps } from "../__set_props";

function cn(...inputs: ClassValue[]) {
  return twMerge(cnx(...inputs));
}

export function Demo() {
  return (
    <div className={cn("block", "gap-0", "flex flex-col items-center")}>
      <div className={cn("rounded-md border bg-color/10 px-2 py-1")}>Cnx</div>
      <div className="flex flex-col items-start">
        <SetProps.Comment title={`// cnx(["foo", 0, false, "bar"])`} />
        {cnx(["foo", 0, false, "bar"])}

        <SetProps.Comment
          title={`// cnx("hello", true && "foo", false && "bar")`}
        />
        {cnx("hello", true && "foo", false && "bar")}

        <SetProps.Comment
          title={`// cnx(["foo"], ["", 0, false, "bar"], [["baz", [["hello"], "there"]]])`}
        />
        {cnx(["foo"], ["", 0, false, "bar"], [["baz", [["hello"], "there"]]])}

        <SetProps.Comment
          title={`// cnx("foo", [1 && "bar", { baz: false, bat: null }, ["hello", ["world"]]], "cya")`}
        />
        {cnx(
          "foo",
          [1 && "bar", { baz: false, bat: null }, ["hello", ["world"]]],
          "cya"
        )}
      </div>
    </div>
  );
}
