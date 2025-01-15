"use client";
import React from "react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Stack } from "@/ui/stack";
import { Group } from "@/ui/group";
import { useListState } from "@/hooks/use-list-state";
import { sanitizedWord } from "@/utility/text-parser";

const initialValues = [
  { label: "Receive email notifications", checked: false },
  { label: "Receive sms notifications", checked: false },
  { label: "Receive push notifications", checked: false },
];

export function Demo() {
  const [isIndeterminate, setIsIndeterminate] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [values, handlers] = useListState(initialValues);

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const items = values.map((value, index) => (
    <Group key={index} className="w-max">
      <Input
        type="checkbox"
        id={sanitizedWord(value.label)}
        className="ml-8"
        checked={value.checked}
        onChange={(event) => handlers.setItemProp(index, "checked", event.currentTarget.checked)}
      />
      <label htmlFor={sanitizedWord(value.label)} className="text-sm text-muted-foreground">{value.label}</label>
    </Group>
  ));

  return (
    <Stack className="m-auto">
      <Stack className="m-auto mb-8">
        <Group className="w-max">
          <Input
          type="checkbox"
          checked={allChecked}
          indeterminate={indeterminate}
          id="all-notifications"
          onChange={() =>
            handlers.setState((current) =>
              current.map((value) => ({ ...value, checked: !allChecked }))
            )
          }
        />
        <label htmlFor="all-notifications" className="text-sm text-muted-foreground">Receive all notifications</label>
      </Group>
      {items}
      </Stack>

      <Stack className="m-auto border-t pt-8">
        <Input
          type="checkbox"
          indeterminate={isIndeterminate}
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            // setIsIndeterminate(false); // Remove indeterminate status if clicked
          }}
        />
        <Button onClick={() => setIsIndeterminate( i => !i )} className="w-max">
          Indeterminate
        </Button>
        <p className="text-sm text-muted-foreground">Clicking the button will change the status to indeterminate.</p>
      </Stack>
    </Stack>
  );
}
