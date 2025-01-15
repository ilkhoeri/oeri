import { twMerge, cnx, type cnxValues } from "str-merge";
import { __docs_demo } from "../../__docs_demo";

function cn(...inputs: cnxValues[]) {
  return twMerge(cnx(...inputs));
}

export function Demo() {
  return (
    <div className={cn("block", "gap-0", "flex flex-col items-center")}>
      <div className={cn("rounded-md border bg-color/10 px-2 py-1")}>Cnx</div>
      <div className="flex flex-col items-start">
        <__docs_demo.comment title={`// cnx(["foo", 0, false, "bar"])`} />
        {cnx(["foo", 0, false, "bar"])}

        <__docs_demo.comment title={`// cnx("hello", true && "foo", false && "bar")`} />
        {cnx("hello", true && "foo", false && "bar")}

        <__docs_demo.comment title={`// cnx(["foo"], ["", 0, false, "bar"], [["baz", [["hello"], "there"]]])`} />
        {cnx(["foo"], ["", 0, false, "bar"], [["baz", [["hello"], "there"]]])}

        <__docs_demo.comment title={`// cnx("foo", [1 && "bar", { baz: false, bat: null }, ["hello", ["world"]]], "cya")`} />
        {cnx( "foo", [1 && "bar", { baz: false, bat: null }, ["hello", ["world"]]], "cya")}
      </div>
    </div>
  );
}
