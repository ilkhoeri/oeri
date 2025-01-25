import * as React from "react";
import * as Link from "next/link";
import { cvx, merge, type cvxProps } from "cretex";

const classes = cvx({
  assign: "",
  variants: {
    underline: {
      always: "underline underline-offset-[.21875rem] decoration-1",
      hover: "underline-hover w-max",
      never: ""
    },
    role: {
      anchor: "text-constructive hover:text-constructive-emphasis"
    }
  }
});

type Options = Pick<AnchorProps, "unstyled" | "role" | "className" | "underline">;
function getStyles(opt: Options) {
  const role = opt.role === "anchor" ? "anchor" : undefined;
  return {
    className: merge(!opt.unstyled && classes({ underline: opt.underline, role }), opt.className)
  };
}

export interface AnchorProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target">,
    Omit<cvxProps<typeof classes>, "role">,
    Omit<Link.LinkProps, "href">,
    AnchorTargets {
  unstyled?: boolean;
  href?: Link.LinkProps["href"];
  role?: React.AriaRole | "anchor";
  style?: React.CSSProperties & Record<string, any>;
}

export const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ rel = "noopener noreferrer nofollow", href = "", role, className, unstyled, underline = "never", ...props }, ref) => (
    <Link.default {...{ ref, rel, href, role, ...getStyles({ className, unstyled, underline, role }), ...props }} />
  )
);
Anchor.displayName = "Anchor";

export type AnchorTargets = {
  /**
   * Target property **`<a>`** :
   *
   * `Please note that some target values may behave differently depending on configuration and browser used.`
   *
   * **`_self`** : Opens the link in the same window or frame.
   *
   * **`_blank`** : Opens the link in a new window or tab.
   *
   * **`_parent`** : Opens the link in the parent frame (if any).
   *
   * **`_top`** : Opens the link at the very top of the window (closes all frames if any).
   *
   * **`_search`** : Used to search for specific text on the intended page.
   *
   * **`_media`** : Used to indicate specific media content (for example, audio or video).
   *
   * **`_messaging`** : Used to communicate with a specific message channel.
   *
   * **`_email`** : Used to open the default email program with the specified email address.
   *
   * **`_ftp`** : Used to open an FTP program with the specified address.
   *
   * **`_tel`** : Used to open the phone application with the specified phone number.
   *
   * **`_sms`** : Used to open the text messaging application with the specified phone number.
   *
   * **`_file`** : Used to open local files on the user's system.
   *
   * **`_about`** : Used to open information about the intended page.
   *
   * **`_calendar`** : Opens the default calendar application with the specified events.
   *
   * **`_contacts`** : Opens the default contacts application with the specified contact.
   *
   * **`_noopener`** : Opens a link by not allowing the target link to access window.opener on the intended page.
   *
   * **`_noreferrer`** : Opens a link by not sending an HTTP referer to the intended page.
   *
   * **`_external`** : A special value that can be specified by a custom implementation to open a link to an external context or a custom application.
   */
  target?:
    | "_about"
    | "_blank"
    | "_calendar"
    | "_contacts"
    | "_email"
    | "_external"
    | "_file"
    | "_ftp"
    | "_media"
    | "_messaging"
    | "_noopener"
    | "_noreferrer"
    | "_parent"
    | "_search"
    | "_self"
    | "_sms"
    | "_tel"
    | "_top"
    | (string & NonNullable<unknown>);
};
