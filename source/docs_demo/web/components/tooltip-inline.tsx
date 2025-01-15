import { Tooltip } from "@/ui/tooltip";

export function Demo() {
  function Inline({ label }: { label: string }) {
    return (
      <Tooltip
        touch
        asChild
        side="top"
        content={`What's ${label}?`}
        contentProps={{
          className: "bg-color text-background [&_[data-tooltip]]:text-color font-medium"
        }}
      >
        <mark>{label}</mark>
      </Tooltip>
    );
  }
  return (
    <div className="m-auto size-full max-w-lg p-6">
      <p className="w-full max-w-full text-justify text-sm">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.{" "}
        <Inline label="Blanditiis" /> dolor placeat odit{" "}
        <Inline label="reprehenderit" /> expedita nisi ab natus inventore
        consectetur a? <Inline label="Quibusdam" /> harum sapiente voluptas nam
        quaerat odit, atque, iusto repellendus expedita, nostrum aperiam magni
        perspiciatis!
      </p>
    </div>
  );
}
