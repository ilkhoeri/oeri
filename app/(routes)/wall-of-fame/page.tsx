import { configMetadata, siteConfig } from "@/app/site/config";
import { Comp } from "@/source/ui/components";
import Link from "next/link";
import Image from "next/image";

import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return configMetadata({
    url: "/wall-of-fame",
    title: "Wall of Fame",
    description: siteConfig.description
  });
}

export default function Page() {
  return (
    <Comp>
      <Link href="https://github.com/ilkhoeri/ioeri/graphs/contributors">
        <figure>
          <figcaption>
            <h1>Thank&apos;s for contributors</h1>
          </figcaption>
          <picture>
            <Image
              src="https://contrib.rocks/image?repo=ilkhoeri/oeri"
              alt="contributors"
              height={32}
              width={32}
            />
          </picture>
        </figure>
      </Link>
    </Comp>
  );
}
