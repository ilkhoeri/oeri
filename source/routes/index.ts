import {
  ComponentsIcon,
  Components2Icon,
  WebHookIcon,
  UtilityIcon,
  CommandIcon,
  IconsIcon
} from "@/modules/icons";

export type InnerRoutes = { title: string; href: string };
export type SingleRoute = { title: string; data: InnerRoutes[] };
export type NestedRoute = { title: string; data: SingleRoute[] };

export const appRoutes = {
  services: [
    {
      title: "Documentation",
      href: "/docs"
    },
    {
      title: "Icons",
      href: "/icons"
    },
    {
      title: "Examples",
      href: "/examples"
    }
    // {
    //   title: "Generators",
    //   href: "",
    // },
  ],
  suggestions: {
    title: "Main",
    data: [
      {
        title: "Getting Started",
        href: "/docs",
        icon: CommandIcon
      },
      {
        title: "Utility",
        href: "/docs/utility",
        icon: UtilityIcon
      },
      {
        title: "Components",
        href: "/docs/components",
        icon: ComponentsIcon
      },
      {
        title: "Hooks",
        href: "/docs/hooks",
        icon: WebHookIcon
      },
      {
        title: "Icons",
        href: "/icons",
        icon: IconsIcon
      },
      {
        title: "Examples",
        href: "/examples",
        icon: Components2Icon
      }
    ]
  },
  footRoutes: [
    {
      title: "Started",
      href: "/docs"
    },
    {
      title: "Components",
      href: "/docs/components"
    },
    {
      title: "Hooks",
      href: "/docs/hooks"
    },
    {
      title: "Icons",
      href: "/icons"
    },
    {
      title: "Examples",
      href: "/examples"
    }
  ]
};
