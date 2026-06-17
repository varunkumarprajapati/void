import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: any[]) => twMerge(clsx(...classes));
