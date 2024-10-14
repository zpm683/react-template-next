/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { isSafari } from "./env-utils";

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

const copyToClipboard = (textToCopy: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(textToCopy);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "absolute";
    textArea.style.opacity = "0";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise<void>((res, rej) => {
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
    });
  }
};

const getSelectionCoords = (win = window) => {
  const doc = win.document as any;

  let sel = doc.selection,
    range,
    rects,
    rect;

  let x = 0,
    y = 0;

  if (sel) {
    if (sel.type !== "Control") {
      range = sel.createRange();
      range.collapse(true);
      x = range.boundingLeft;
      y = range.boundingTop;
    }
  } else if (win.getSelection) {
    sel = win.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange();
      if (range.getClientRects) {
        range.collapse(true);
        rects = range.getClientRects();
        if (rects.length > 0) {
          rect = rects[0];
        }

        if (rect) {
          x = rect.left;
          y = rect.top;
        }
      }

      if ((x === 0 && y === 0) || rect === undefined) {
        const span = doc.createElement("span");
        if (span.getClientRects) {
          span.appendChild(doc.createTextNode("\u200b"));
          range.insertNode(span);
          rect = span.getClientRects()[0];
          x = rect.left;
          y = rect.top;
          const spanParent = span.parentNode;
          spanParent?.removeChild(span);
          spanParent?.normalize();
        }
      }
    }
  }
  return { x: Math.ceil(x), y: Math.ceil(y) };
};

type Range = {
  start: number;
  end: number;
};

/**
 * insert Text At Cursor
 * @param element
 * @param text
 * @param range
 */
const insertTextAtCursor = (element: Element, text: string, range?: Range) => {
  const textTagName = element.tagName;

  if (textTagName !== "DIV") {
    const input = element as HTMLInputElement;
    // Most of the used APIs only work with the field selected
    input.focus();

    const start = range?.start ?? input.selectionStart ?? 0;
    const end = range?.end ?? input.selectionEnd ?? 0;

    input.setRangeText(text, start, end);
    // Correct the cursor position to be at the end of the insertion
    input.setSelectionRange(start + text.length, start + text.length);
    // Notify any possible listeners of the change
    const e = document.createEvent("UIEvent");
    e.initEvent("input", true, false);
    input.dispatchEvent(e);
  } else {
    const textEvent = document.createEvent("TextEvent") as any;
    textEvent.initTextEvent("textInput", true, true, null, text);
    element.dispatchEvent(textEvent);
  }
};

/**
 * rgb to hex
 * @param rgbStr rgb color string
 * @example
 * rgb2hex("000255255") // #00ffff
 * rgb2hex("123") // ""
 */
const rgb2hex = (rgbStr: string) => {
  return rgbStr.length === 9
    ? `#${(
        (Number(rgbStr.substring(0, 3)) << 16) +
        (Number(rgbStr.substring(3, 6)) << 8) +
        Number(rgbStr.substring(6, 9))
      )
        .toString(16)
        .padStart(6, "0")}`
    : "";
};

/**
 * hex to rgb/rga
 * @param hex
 * @param opacity
 * @example
 * hex2rgb("#fff") // rgb(255,255,255)
 * hex2rgb("#ffffff") // rgb(255,255,255)
 * hex2rgb("ffffff") // rgb(255,255,255)
 * hex2rgb("66ccff", 0.5)// rgba(102,204,255,0.5)
 * hex2rgb("66ccff", 0) // rgba(102,204,255,0)
 * hex2rgb("66ccff", 1) // rgb(102,204,255)
 */
const hex2rgb = (hex: string, opacity = 1) => {
  const isRgba = 0 <= opacity && opacity < 1;
  const color = (hex = hex.replace("#", ""))
    .match(new RegExp("(.{" + hex.length / 3 + "})", "g"))
    ?.map((v) => {
      return parseInt(hex.length % 2 ? v + v : v, 16);
    });

  return color
    ? isRgba
      ? `rgba(${color.concat(opacity).join(",")})`
      : `rgb(${color.join(",")})`
    : "";
};

export {
  wait,
  toString,
  toBool,
  toNumber,
  on,
  off,
  buildCsvUrl,
  saveAs,
  copyToClipboard,
  getSelectionCoords,
  insertTextAtCursor,
  rgb2hex,
  hex2rgb,
};
