import {
  ComponentsIcon,
  Components2Icon,
  WebhookIcon,
  UtilityIcon,
  CommandIcon,
  IconsIcon,
  BrandDiscordFillIcon,
  BrandGithubFillIcon,
  HeartIcon,
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
  sections: [
    {
      label: "Github Repository",
      href: "https://github.com/ilkhoeri/oeri",
      icon: BrandGithubFillIcon,
      color: "#6e5494"
    },
    {
      label: "Discord Community",
      href: "https://discord.gg/Xct5BBPDZ9",
      icon: BrandDiscordFillIcon,
      color: "#436ab2"
    },
    {
      label: "Open Collective",
      href: "https://opencollective.com/oeri",
      icon: HeartIcon,
      color: "#b11c66"
    }
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
