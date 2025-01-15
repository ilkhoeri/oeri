import {
  ComponentsIcon,
  Components2Icon,
  WebhookIcon,
  UtilityIcon,
  CommandIcon,
  IconsIcon,
  AppsIcon
} from "@/icons/*";

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
        title: "Configurations",
        href: "/docs/configurations",
        icon: AppsIcon
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
        icon: WebhookIcon
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
      href: "/docs/web/components"
    },
    {
      title: "Hooks",
      href: "/docs/web/hooks"
    },
    {
      title: "Configurations",
      href: "/docs/web/configurations"
    },
    {
      title: "Icons",
      href: "/icons"
    },
    {
      title: "Examples",
      href: "/examples"
    },
    {
      title: "Contributors",
      href: "/contributors"
    }
  ]
};
