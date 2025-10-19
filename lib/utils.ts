import z from "zod";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: any) {
  if (error.name === "ZodError") {
    const fieldsError =
      error.issues?.map((issue: z.core.$ZodIssue) => {
        return `${issue.path.join(".")}: ${issue.message}`;
      }) || [];
    return fieldsError.join(". ");
  } else if (error.name === "PrismaClientKnownRequestError" && error.code === "P2002") {
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
  } else {
    return typeof error?.message === "string" ? error.message : JSON.stringify(error.message);
  }
}

export function round2(value: number | string) {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("Value is not a number or string");
  }
}

export const CURRENCY_FORMAT = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

// format current using the formatter above
export function formatCurrency(amount: number | string | null) {
  if (typeof amount === "number") {
    return CURRENCY_FORMAT.format(amount);
  } else if (typeof amount === "string") {
    return CURRENCY_FORMAT.format(Number(amount));
  } else {
    return NaN;
  }
}

// shorten uuid
export function formatId(id: string) {
  return `..${id.substring(id.length - 6)}`;
}

// format date and time
export const formatDateTime = (dateString: string | Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDateTime: string = new Date(dateString).toLocaleDateString("en-US", dateTimeOptions);
  const formattedDate: string = new Date(dateString).toLocaleDateString("en-US", dateOptions);
  const formattedTime: string = new Date(dateString).toLocaleTimeString("en-US", timeOptions);
  return {
    dateTime: formattedDateTime,
    date: formattedDate,
    time: formattedTime,
  };
};
