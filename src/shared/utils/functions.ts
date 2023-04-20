import { isSafari } from "./envUtils";

const toString = (
  input: string | number | undefined,
  length = 0,
  fillStr = "0",
) => {
  let str = `${input ?? ""}`;
  if (length - str.length > 0) str = str.padStart(length, fillStr);
  return str;
};

const toBool = (input: string | number | undefined): boolean => {
  if (typeof input === "number") return input === 1;
  return !!input && input.toLowerCase() === "true";
};

const toNumber = (input: string | undefined): number =>
  input ? Number(input) : 0;

function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T["addEventListener"]> | [string, Function | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement["addEventListener"]>),
    );
  }
}

function off<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T["removeEventListener"]>
    | [string, Function | null, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement["removeEventListener"]>),
    );
  }
}

/**
 * wait some time in async function
 * @param ms
 * @example async () => {
 await wait(2000);
}
 */
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const buildCsvUrl = (dataStr: string) => {
  const csvStr = dataStr.replace(/"/g, '""');
  const type = isSafari() ? "application/csv" : "text/csv";

  // NOTE: if use other encode, you can use jconv lib
  // import { encode } from "jconv";
  // const jisBuffer = encode(csvStr, "Shift_JIS");
  const blob = new Blob([csvStr], { type });

  const URL = window.URL || window.webkitURL;

  return URL.createObjectURL(blob);
};

/**
 * save as a file
 * @param uri
 * @param filename
 */
const saveAs = (uri: string, filename: string) => {
  const link = document.createElement("a");
  if (typeof link.download === "string") {
    link.href = uri;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
};

export { wait, toString, toBool, toNumber, on, off, buildCsvUrl, saveAs };
