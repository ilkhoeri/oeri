"use client";
import React from "react";
import Svg from "@/ui/svg";
import { cn, cvx } from "cretex";
import { Tabs } from "@/ui/tabs";
import { Times } from "@/ui/times";
import { Avatar } from "@/ui/avatar";
import { Sheets } from "@/ui/sheets";
import { Tooltip } from "@/ui/tooltip";
import { Indicator } from "@/ui/indicator";
import { ScrollArea } from "@/ui/scroll-area";
import { Button, buttonVariants } from "@/ui/button";
import { UserErrorIcon, UserInfoIcon, UserSuccessIcon, UserSupportIcon, UserWarningIcon } from "@/icons/*";

type NotificationStatus = "unread" | "read";
type NotificationPriority = "low" | "medium" | "high";
type NotificationType = "info" | "warning" | "error" | "success" | "message";

interface User {
  id: string;
  name: string;
  image?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  status: NotificationStatus;
  receivedAt: string | Date;
  readAt?: string | Date;
  source?: string;
  linkUrl?: string;
  priority?: NotificationPriority;
  sender?: User;
}

type NotificationsTab = {
  key: "all" | "unread" | "read";
  notification: Notification[];
};

const dummyNotifications: Notification[] = [
  {
    id: "n1",
    title: "System Info",
    message: "System is running smoothly.",
    type: "info",
    status: "unread",
    receivedAt: "2025-04-29T09:00:00Z",
    priority: "low",
    source: "system"
  },
  {
    id: "n2",
    title: "Update Complete",
    message: "The update was installed successfully.",
    type: "success",
    status: "unread",
    receivedAt: "2025-04-29T10:00:00Z",
    priority: "medium",
    source: "updater"
  },
  {
    id: "n3",
    title: "Low Disk Space",
    message: "Only 2GB left on drive C:.",
    type: "warning",
    status: "read",
    receivedAt: "2025-04-28T14:00:00Z",
    readAt: "2025-04-28T14:30:00Z",
    priority: "high",
    source: "system"
  },
  {
    id: "n4",
    title: "500 Internal Server Error",
    message: "Something went wrong.",
    type: "error",
    status: "unread",
    receivedAt: "2025-04-28T08:00:00Z",
    priority: "high",
    source: "api"
  },
  {
    id: "n5",
    title: "New Message from Alice",
    message: "Hey, are you available for a quick call?",
    type: "message",
    status: "unread",
    receivedAt: "2025-04-29T11:15:00Z",
    sender: {
      id: "u1",
      name: "Alice Johnson",
      image: "https://api.dicebear.com/9.x/lorelei/svg?seed=1.jpg"
    },
    linkUrl: "/messages/u1",
    priority: "medium"
  },
  {
    id: "n6",
    title: "New Message from Bob",
    message: "Sure, I’ll send the report shortly.",
    type: "message",
    status: "read",
    receivedAt: "2025-04-29T08:15:00Z",
    readAt: "2025-04-29T08:30:00Z",
    sender: {
      id: "u2",
      name: "Bob Smith",
      image: "https://api.dicebear.com/9.x/lorelei/svg?seed=2.jpg"
    },
    linkUrl: "/messages/u2",
    priority: "low"
  },
  {
    id: "n7",
    title: "User Login Detected",
    message: "Login from Chrome on Windows.",
    type: "info",
    status: "read",
    receivedAt: "2025-04-27T21:00:00Z",
    readAt: "2025-04-27T21:05:00Z",
    source: "security"
  },
  {
    id: "n8",
    title: "High CPU Usage",
    message: "Server CPU usage is over 90%.",
    type: "warning",
    status: "unread",
    receivedAt: "2025-04-30T06:30:00Z",
    priority: "high",
    source: "monitoring"
  },
  {
    id: "n9",
    title: "Backup Complete",
    message: "The daily backup was completed.",
    type: "success",
    status: "read",
    receivedAt: "2025-04-29T02:00:00Z",
    readAt: "2025-04-29T02:10:00Z",
    priority: "medium"
  },
  {
    id: "n10",
    title: "App Crash Detected",
    message: "Crash reported on Android 13.",
    type: "error",
    status: "read",
    receivedAt: "2025-04-28T12:45:00Z",
    readAt: "2025-04-28T13:00:00Z",
    priority: "high",
    source: "crashlytics"
  },
  {
    id: "n11",
    title: "Message from Charlie",
    message: "Project meeting moved to 3 PM.",
    type: "message",
    status: "unread",
    receivedAt: "2025-04-30T08:30:00Z",
    sender: {
      id: "u3",
      name: "Charlie Green",
      image: "https://api.dicebear.com/9.x/lorelei/svg?seed=3.jpg"
    },
    linkUrl: "/messages/u3"
  },
  {
    id: "n12",
    title: "New Feature Released",
    message: "Dark mode is now available.",
    type: "info",
    status: "unread",
    receivedAt: "2025-04-28T07:00:00Z",
    source: "releases",
    priority: "low"
  },
  {
    id: "n13",
    title: "Quota Warning",
    message: "You’ve used 95% of your API quota.",
    type: "warning",
    status: "read",
    receivedAt: "2025-04-29T05:00:00Z",
    readAt: "2025-04-29T05:20:00Z",
    priority: "medium"
  },
  {
    id: "n14",
    title: "Deployment Failed",
    message: "Production build failed during CI.",
    type: "error",
    status: "unread",
    receivedAt: "2025-04-30T03:15:00Z",
    source: "ci/cd",
    priority: "high"
  },
  {
    id: "n15",
    title: "Monthly Report Ready",
    message: "Click to download your report.",
    type: "success",
    status: "unread",
    receivedAt: "2025-04-28T09:45:00Z",
    linkUrl: "/reports/march",
    priority: "medium"
  },
  {
    id: "n16",
    title: "System Notification",
    message: "Your profile has been updated.",
    type: "info",
    status: "read",
    receivedAt: "2025-04-27T17:30:00Z",
    readAt: "2025-04-27T18:00:00Z",
    source: "profile"
  },
  {
    id: "n17",
    title: "Message from Dana",
    message: "Check the latest draft when you can.",
    type: "message",
    status: "read",
    receivedAt: "2025-04-27T19:00:00Z",
    readAt: "2025-04-27T19:15:00Z",
    sender: {
      id: "u4",
      name: "Dana Lee",
      image: "https://api.dicebear.com/9.x/lorelei/svg?seed=4.jpg"
    },
    linkUrl: "/messages/u4"
  },
  {
    id: "n18",
    title: "Security Warning",
    message: "Multiple failed login attempts.",
    type: "warning",
    status: "unread",
    receivedAt: "2025-04-29T22:00:00Z",
    source: "security",
    priority: "high"
  },
  {
    id: "n19",
    title: "License Expiring Soon",
    message: "Your license will expire in 3 days.",
    type: "warning",
    status: "unread",
    receivedAt: "2025-04-28T15:00:00Z",
    source: "billing",
    priority: "medium"
  },
  {
    id: "n20",
    title: "Update Error",
    message: "Failed to install update v2.1.4.",
    type: "error",
    status: "read",
    receivedAt: "2025-04-27T16:00:00Z",
    readAt: "2025-04-27T16:20:00Z",
    source: "updater"
  },
  {
    id: "n21",
    title: "Success Sync",
    message: "Data sync completed.",
    type: "success",
    status: "read",
    receivedAt: "2025-04-26T09:00:00Z",
    readAt: "2025-04-26T09:10:00Z"
  },
  {
    id: "n22",
    title: "Admin Message",
    message: "Welcome to the new dashboard.",
    type: "message",
    status: "unread",
    receivedAt: "2025-04-26T10:00:00Z",
    sender: {
      id: "u5",
      name: "Admin"
    }
  },
  {
    id: "n23",
    title: "System Reboot",
    message: "Server restarted at 3:00 AM.",
    type: "info",
    status: "read",
    receivedAt: "2025-04-25T03:00:00Z",
    readAt: "2025-04-25T03:30:00Z",
    priority: "medium"
  },
  {
    id: "n24",
    title: "Warning: High Memory",
    message: "Memory usage exceeds 85%.",
    type: "warning",
    status: "read",
    receivedAt: "2025-04-24T22:00:00Z",
    readAt: "2025-04-24T22:30:00Z"
  },
  {
    id: "n25",
    title: "Service Restored",
    message: "Email delivery has resumed.",
    type: "success",
    status: "unread",
    receivedAt: "2025-04-25T12:00:00Z",
    priority: "low"
  },
  {
    id: "n26",
    title: "Critical Error Logged",
    message: "Unhandled exception in /api/users.",
    type: "error",
    status: "unread",
    receivedAt: "2025-04-30T09:30:00Z",
    priority: "high"
  }
];

const priorityVariants = cvx({
  assign: "rounded-full size-2",
  variants: {
    priority: {
      low: "bg-[#16C47F]",
      medium: "bg-[#FFD63A]",
      high: "bg-[#F14A00]",
      unknown: "bg-color"
    }
  }
});

export function getNotificationTabs(notifications: Notification[]) {
  const all = notifications;
  const unread = notifications.filter(n => n.status === "unread");
  const read = notifications.filter(n => n.status === "read");

  return [
    { key: "all", notification: all },
    { key: "unread", notification: unread },
    { key: "read", notification: read }
  ] as NotificationsTab[];
}
function getNotifIcon(notification: Notification) {
  if (notification.type === "message" && notification.sender?.image) {
    return <Avatar color="white" src={notification.sender.image} fallback={notification.sender.name} />;
  }

  function wrap(content: React.ReactNode, opt: { color?: string } = {}) {
    return (
      <div className="relative flex size-[--size] max-h-[--size] min-h-[--size] min-w-[--size] max-w-[--size] select-none items-center justify-center overflow-hidden rounded-full p-0 [--size:38px] [&>svg]:text-[--icon-color]" {...{ style: { "--icon-color": opt?.color } as React.CSSProperties }}>
        {content}
      </div>
    );
  }

  switch (notification.type) {
    case "info":
      return wrap(<UserInfoIcon size={32} />, { color: "#00879E" });
    case "warning":
      return wrap(<UserWarningIcon size={32} />, { color: "#FFD63A" });
    case "error":
      return wrap(<UserErrorIcon size={32} />, { color: "#F14A00" });
    case "success":
      return wrap(<UserSuccessIcon size={32} />, { color: "#16C47F" });
    default:
      return wrap(<UserSupportIcon size={32} />);
  }
}
function markAllAsRead(notifications: Notification[]): Notification[] {
  return notifications.map(n => (n.status === "unread" ? { ...n, status: "read", readAt: new Date().toISOString() } : n));
}

export function DropdownNotifications() {
  const [notifications, setNotifications] = React.useState<Notification[]>(dummyNotifications);
  const [activeTab, setActiveTab] = React.useState<"all" | "read" | "unread">("all");

  const totalNewNotifications = notifications.filter(n => n.status === "unread").length;

  function handleMarkAllAsRead() {
    const updated = markAllAsRead(notifications);
    setNotifications(updated);
  }

  const data: NotificationsTab[] = getNotificationTabs(notifications);

  const filteredNotifications = React.useMemo(() => {
    if (activeTab === "read") return notifications.filter(n => n.status === "read");
    if (activeTab === "unread") return notifications.filter(n => n.status === "unread");
    return notifications;
  }, [notifications, activeTab]);

  const priorityCountMap = React.useMemo(() => {
    const map: Record<NotificationPriority, number> = {
      low: 0,
      medium: 0,
      high: 0
    };

    filteredNotifications.forEach(n => {
      if (n.priority) {
        map[n.priority] += 1;
      }
    });

    return map;
  }, [filteredNotifications]);

  const uniquePriorities = (Object.entries(priorityCountMap) as [NotificationPriority, number][]).filter(([, count]) => count > 0);

  return (
    <Sheets align="end" clickOutsideToClose modal sideOffset={4} variant="dropdown">
      <Indicator size={18} offset={2} disabled={!totalNewNotifications} label={totalNewNotifications} color="#FF5630" withBorder>
        <Sheets.Trigger className={cn(buttonVariants({ size: "icon", variant: "unset" }), "[--sz:38px] data-[state=open]/st:bg-color data-[state=open]/st:text-background hover:data-[state=open]/st:bg-color hover:data-[state=open]/st:text-background")}>
          <Svg size={24} currentFill="fill" className="transition-colors">
            <path d="M8.352 20.242A4.63 4.63 0 0 0 12 22a4.63 4.63 0 0 0 3.648-1.758a27.2 27.2 0 0 1-7.296 0" />
            <path
              fillRule="evenodd"
              d="M18.75 9.704V9c0-3.866-3.023-7-6.75-7S5.25 5.134 5.25 9v.704c0 .845-.24 1.671-.692 2.374L3.45 13.801c-1.011 1.574-.239 3.713 1.52 4.21a25.8 25.8 0 0 0 14.06 0c1.759-.497 2.531-2.636 1.52-4.21l-1.108-1.723a4.4 4.4 0 0 1-.693-2.374M12 5.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75"
              clipRule="evenodd"
            />
          </Svg>
        </Sheets.Trigger>
      </Indicator>
      <Sheets.Content className="h-full max-h-[436px] w-[358px] bg-[#f4f6ff] p-4 shadow-lg dark:bg-[#151619]">
        <div className="mb-2">
          <h3 className="block text-xs font-medium text-muted-foreground">Notifications</h3>
          <div className="flex items-center justify-between gap-6">
            <p className="my-0 text-sm font-normal text-color">
              {totalNewNotifications > 0 ? `You have ${totalNewNotifications}` : "Not have"} new notification{totalNewNotifications !== 1 ? "s" : ""}
            </p>
            <Button variant="outline" color="blue" size="sm" onClick={handleMarkAllAsRead}>
              <span className="whitespace-nowrap text-sm">Read all</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue={data?.[0]?.key} value={activeTab} onValueChange={value => setActiveTab(value as "all" | "read" | "unread")} variant="pills" round={999} color={{ bg: "hsl(var(--muted))", text: "hsl(var(--color))" }}>
          <Tabs.List gap={0}>
            {data.map(item => (
              <Tabs.Tab key={item.key} value={item.key} onClick={() => setActiveTab(item.key)} className="text-[13px] font-medium capitalize text-muted-foreground aria-selected:text-color">
                {item.key}
                {item.notification.length > 0 && <span className="absolute -right-2 -top-2 z-[200] rounded-full bg-red-500 p-1 text-[10px] font-medium leading-none text-white">{item.notification.length}</span>}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <ScrollArea color={{ thumb: "hsl(var(--muted-foreground))" }} classNames={{ root: "py-0.5", viewport: "max-h-[18.25rem] rounded-xl pb-px" }}>
            {data.map(item => {
              return (
                <Tabs.Panel key={item.key} value={item.key} className="space-y-[3px]">
                  {item.notification.map(notif => {
                    const icon = getNotifIcon(notif);
                    return (
                      <div key={notif.id} className="group/item relative flex cursor-pointer flex-row items-center justify-start gap-2 rounded-xl border px-2 py-2.5 transition-colors hover:bg-muted-foreground/20">
                        {icon}
                        <div className="grid grid-flow-row">
                          <p className="text-sm font-medium text-color">{notif.title}</p>
                          <p className="text-xs text-muted-foreground">{notif.message}</p>
                        </div>
                        <div className="absolute right-1 top-1 grid w-fit grid-flow-col items-center gap-1.5">
                          <Tooltip asChild side="left" content={`${notif.priority} Priority`} classNames={{ content: "capitalize px-2 py-1 text-xs font-medium" }}>
                            <span role="button" tabIndex={-1} aria-label={notif.source} className={priorityVariants({ ...notif })} />
                          </Tooltip>
                          <Times format="default" time={notif.receivedAt} className="text-xs font-medium text-muted-foreground" />
                        </div>
                      </div>
                    );
                  })}
                </Tabs.Panel>
              );
            })}
          </ScrollArea>
        </Tabs>
        <div className="ml-auto mt-1 grid w-max grid-flow-col items-center space-x-2 rounded-xl border px-2 py-1 empty:sr-only empty:hidden">
          {uniquePriorities.map(([priority, count]) => (
            <p key={priority} className="inline-flex items-center gap-1 whitespace-nowrap text-xs capitalize text-muted-foreground">
              <span className={priorityVariants({ priority })} /> {priority} ({count})
            </p>
          ))}
        </div>
      </Sheets.Content>
    </Sheets>
  );
}
