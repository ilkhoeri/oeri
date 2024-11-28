type TimeFormats = { diff?: "long" | "short" | "growth" };
export const getTimeAgo = (date: Date, format: TimeFormats = {}): string => {
  const { diff = "short" } = format;
  const now = new Date();
  const newdiff = now.getTime() - date.getTime();

  const seconds = Math.floor(newdiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  switch (diff) {
    case "long":
      if (years > 0) {
        const remainingMonths = Math.floor((days % 365) / 30);
        const remainingDays = (days % 365) % 30;
        return `${years} years${
          remainingMonths ? `, ${remainingMonths} months` : ""
        }${remainingDays ? `, ${remainingDays} days` : ""} ago`;
      } else if (months > 0) {
        const remainingDays = days % 30;
        return `${months} months${
          remainingDays ? `, ${remainingDays} days` : ""
        } ago`;
      } else if (days > 0) {
        return `${days} days ago`;
      } else if (hours > 0) {
        return `${hours} hours ago`;
      } else if (minutes > 0) {
        return `${minutes} minutes ago`;
      } else {
        return "Just now";
      }

    case "short":
      if (days > 0) {
        return `${days} days ago`;
      } else if (hours > 0) {
        return `${hours} hours ago`;
      } else if (minutes > 0) {
        return `${minutes} minutes ago`;
      } else {
        return "Just now";
      }

    case "growth":
      if (days < 1) {
        if (hours > 0) {
          return `${hours} hours ago`;
        } else if (minutes > 0) {
          return `${minutes} minutes ago`;
        } else {
          return "Just now";
        }
      } else {
        date.setHours(date.getHours());
        const formatted = date.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        });
        return formatted;
      }

    default:
      return "";
  }
};

export function isSameDate(date1: Date, date2: Date) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}

export const getTimeInterval = (date1: Date, date2: Date): string => {
  const diff = Math.abs(date1.getTime() - date2.getTime());
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days`;
  } else if (hours > 0) {
    return `${hours} hours`;
  } else if (minutes > 0) {
    return `${minutes} minutes`;
  } else {
    return `${seconds} seconds`;
  }
};

type TimedType = {
  locales?: Intl.LocalesArgument;
  options?: Intl.DateTimeFormatOptions;
};

export const sortStringDate = (
  date: Date,
  {
    locales = "id-ID",
    options: {
      day = "2-digit",
      year = "numeric",
      month = "short",
      ...restOptions
    } = {}
  }: TimedType = {}
): string => {
  const updatedOptions: Intl.DateTimeFormatOptions = {
    day,
    year,
    month,
    ...restOptions
  };

  return date.toLocaleString(locales, updatedOptions);
};

export const longStringDate = (
  date: Date,
  {
    locales = "id-ID",
    options: {
      day = "2-digit",
      year = "numeric",
      month = "short",
      hour = "2-digit",
      minute = "2-digit",
      //second = "numeric",
      timeZoneName = "short",
      ...restOptions
    } = {}
  }: TimedType = {}
): string => {
  const updatedOptions: Intl.DateTimeFormatOptions = {
    day,
    year,
    month,
    hour,
    minute,
    //second,
    timeZoneName,
    ...restOptions
  };

  return date.toLocaleString(locales, updatedOptions).replace(".", ":");
};

type PostDate = "long" | "short" | "growth";
export function getPostDate(d: string, type: PostDate): string {
  const date = new Date(d); // Konversi ke objek Date
  date.setHours(date.getHours());

  const formattedLong = date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const day = date.getDate().toString().padStart(2, "0"); // Menambahkan 0 di depan jika hanya satu digit
  const month = date.toLocaleString("id-ID", { month: "short" });
  const year = date.getFullYear().toString().slice(-2); // Mengambil dua digit terakhir dari tahun
  const formattedShort = `${day} ${month} ${year}`;

  const formattedGrowth = date
    .toLocaleDateString("id-ID", {
      hour12: false, // Menggunakan format 24 jam
      minute: "2-digit",
      hour: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZoneName: "short"
    })
    .replace(".", ":");

  switch (type) {
    case "long":
      return formattedLong;
    case "short":
      return formattedShort;
    case "growth":
      return formattedGrowth;
    default:
      return "";
  }
}
