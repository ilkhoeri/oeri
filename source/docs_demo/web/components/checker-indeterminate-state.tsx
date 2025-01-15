
import { useListState } from "@/hooks/use-list-state";
import { Checker } from "@/ui/checker";

const initialValues = [
  { label: "Receive email notifications", checked: false },
  { label: "Receive sms notifications", checked: false },
  { label: "Receive push notifications", checked: false },
];

export function Demo() {
  const [values, handlers] = useListState(initialValues);

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const items = values.map((value, index) => (
    <Checker
      type="checkbox"
      key={index}
      label={value.label}
      className="ml-8 mt-2"
      checked={value.checked}
      onChange={(event) => handlers.setItemProp(index, "checked", event.currentTarget.checked)}
    />
  ));

  return (
    <div className="m-auto grid grid-flow-row">
      <Checker
        type="checkbox"
        checked={allChecked}
        indeterminate={indeterminate}
        label="Receive all notifications"
        onChange={() =>
          handlers.setState((current) =>
            current.map((value) => ({ ...value, checked: !allChecked }))
          )
        }
      />
      {items}
    </div>
  );
}