import React from "react";
import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";

export function Demo() {
  const [loading, setLoading] = React.useState(true);
  return (
    <div className="m-auto flex size-full flex-col items-center justify-center px-4">
      <div className="mb-6 flex items-start gap-4 max-md:flex-col md:flex-row">
        <Skeleton asChild circle visible={loading} size={120}>
          <button type="button" className="border font-heading">B</button>
        </Skeleton>
        <div className="flex flex-col items-center justify-center gap-1">
          <Skeleton visible={loading} round={8}>
            Lorem ipsum dolor sit amet...
          </Skeleton>
          <Skeleton visible={loading} round={8}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat adipisci, iste ducimus quasi ipsa autem tenetur! Exercitationem perferendis mollitia omnis.
          </Skeleton>
          <Skeleton visible={loading} round={8}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro unde itaque ea corrupti maxime perferendis deserunt praesentium iure nemo, consequatur obcaecati eaque, ipsum et alias saepe, ab placeat quo reiciendis.
          </Skeleton>
        </div>
      </div>

    <Button onClick={() => setLoading((l) => !l)}>
      Toggle Skeleton
    </Button>
    </div>
  );
}
