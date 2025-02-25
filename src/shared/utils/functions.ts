/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

//////////////////////////////////// IS FUNCTION ////////////////////////////////////
/**
 * Checks if the current environment is a browser.
 * @returns True if the current environment is a browser, false otherwise.
 */
export const isBrowser = () =>
  !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );

/**
 * Gets the user agent string of the browser.
 * @returns The user agent string.
 */
export const getUserAgent = () => {
  return window.navigator.userAgent;
};

/**
 * Checks if the browser is Safari.
 * @returns True if the browser is Safari, false otherwise.
 */
export const isSafari = () => {
  return /\bsafari\b/i.test(getUserAgent());
};

/**
 * Checks if the browser is Chrome.
 * @returns True if the browser is Chrome, false otherwise.
 */
export const isChrome = () => {
  return /\bchrome\b/i.test(getUserAgent());
};

/**
 * Checks if the browser is either Safari or Chrome.
 * @returns True if the browser is Safari or Chrome, false otherwise.
 */
export const isSafariOrChrome = () => {
  return /\b(safari|chrome)\b/i.test(getUserAgent());
};

/**
 * Checks if the browser is Firefox.
 * @returns True if the browser is Firefox, false otherwise.
 */
export const isFirefox = () => {
  return /\b(firefox|gecko)\b/i.test(getUserAgent());
};

/**
 * Checks if the browser is Opera.
 * @returns True if the browser is Opera, false otherwise.
 */
export const isOpera = () => {
  return /\bopera\b/i.test(getUserAgent());
};

/**
 * Checks if the browser is Internet Explorer.
 * @returns True if the browser is Internet Explorer, false otherwise.
 */
export const isIE = () => {
  return /\bmsie\b/i.test(getUserAgent());
};

/**
 * Checks if the browser is online.
 * @returns True if the browser is online, false otherwise.
 */
export const isOnLine = () => {
  return window.navigator.onLine;
};

/**
 * Checks if a value is null or undefined.
 * @param value The value to check.
 * @returns True if the value is null or undefined, false otherwise.
 */
export function isNullable(value: any) {
  return value === null || value === undefined;
}

/**
 * Checks if a value is a string.
 * @param value The value to check.
 * @returns True if the value is a string, false otherwise.
 */
export function isString(value: any) {
  return typeof value === "string";
}

/**
 * Checks if a value is a number.
 * @param value The value to check.
 * @returns True if the value is a number, false otherwise.
 */
export function isNumber(value: any) {
  return typeof value === "number";
}

/**
 * Checks if a value is a boolean.
 * @param value The value to check.
 * @returns True if the value is a boolean, false otherwise.
 */
export function isBoolean(value: any) {
  return typeof value === "boolean";
}

/**
 * Checks if a value is an array.
 * @param value The value to check.
 * @returns True if the value is an array, false otherwise.
 */
export function isArray(value: any) {
  return Array.isArray(value);
}

/**
 * Checks if a value is a function.
 * @param value The value to check.
 * @returns True if the value is a function, false otherwise.
 */
export function isFunction(value: any) {
  return typeof value === "function";
}

/**
 * Checks if an object is empty.
 * @param obj The object to check.
 * @returns True if the object is empty, false otherwise.
 */
export const isEmptyObject = (obj: object) => {
  return Object.keys(obj).length === 0;
};

//////////////////////////////////// TO FUNCTION ////////////////////////////////////

/**
 * Converts a value to a string and pads it to a specified length.
 * @param input The value to convert.
 * @param length The length to pad the string to.
 * @param fillStr The string to pad with.
 * @returns The padded string.
 */
export const toString = (
  input: string | number | undefined,
  length = 0,
  fillStr = "0",
) => {
  let str = `${input ?? ""}`;
  if (length - str.length > 0) str = str.padStart(length, fillStr);
  return str;
};

/**
 * Converts a value to a boolean.
 * @param input The value to convert.
 * @returns The converted boolean.
 */
export const toBool = (input: string | number | undefined) => {
  if (typeof input === "number") return input === 1;
  return !!input && input.toLowerCase() === "true";
};

/**
 * Converts a value to a number.
 * @param input The value to convert.
 * @returns  The converted number.
 */
export const toNumber = (input: string | undefined) =>
  input ? Number(input) : 0;

//////////////////////////////////// OTHER FUNCTION ////////////////////////////////////

/**
 * Adds an event listener to an object.
 * @param obj The object to add the event listener to.
 * @param args The arguments to pass to addEventListener.
 */
export function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T["addEventListener"]> | [string, Function | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement["addEventListener"]>),
    );
  }
}

/**
 * Removes an event listener from an object.
 * @param obj The object to remove the event listener from.
 * @param args The arguments to pass to removeEventListener.
 */
export function off<T extends Window | Document | HTMLElement | EventTarget>(
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
 * Gets the value of a cookie.
 * @param name The name of the cookie.
 * @returns {string | undefined} The value of the cookie, or undefined if the cookie does not exist.
 */
export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

/**
 * Waits for a specified amount of time.
 * @param ms The amount of time to wait, in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified amount of time.
 */
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Builds a CSV URL from a string.
 * @param dataStr The string to build the CSV URL from.
 * @returns The CSV URL.
 */
export const buildCsvUrl = (dataStr: string) => {
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
 * Saves a file.
 * @param uri The URI of the file.
 * @param filename The name of the file.
 */
export const saveAs = (uri: string, filename: string) => {
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

/**
 * Copies text to the clipboard.
 * @param textToCopy The text to copy.
 * @returns {Promise<void>} A promise that resolves when the text has been copied.
 */
export const copyToClipboard = (textToCopy: string) => {
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

/**
 * Gets the coordinates of the current text selection.
 * @param win The window object.
 * @returns {{ x: number, y: number }} The coordinates of the current text selection.
 */
export const getSelectionCoords = (win = window) => {
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
 * Inserts text at the cursor position in an input element.
 * @param element The input element.
 * @param text The text to insert.
 * @param range The range to insert the text at.
 */
export const insertTextAtCursor = (
  element: Element,
  text: string,
  range?: Range,
) => {
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
 * Converts an RGB string to a hex string.
 * @param rgbStr The RGB string.
 * @returns The hex string.
 * @example
 * rgb2hex("000255255") // #00ffff
 * rgb2hex("123") // ""
 */
export const rgb2hex = (rgbStr: string) => {
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
 * Converts a hex string to an RGB or RGBA string.
 * @param hex The hex string.
 * @param opacity The opacity value.
 * @returns The RGB or RGBA string.
 * @example
 * hex2rgb("#fff") // rgb(255,255,255)
 * hex2rgb("#ffffff") // rgb(255,255,255)
 * hex2rgb("ffffff") // rgb(255,255,255)
 * hex2rgb("66ccff", 0.5)// rgba(102,204,255,0.5)
 * hex2rgb("66ccff", 0) // rgba(102,204,255,0)
 * hex2rgb("66ccff", 1) // rgb(102,204,255)
 */
export const hex2rgb = (hex: string, opacity = 1) => {
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

/**
 * Creates a debounced function that delays invoking the provided function until after the specified wait time has elapsed since the last time the debounced function was invoked.
 * @param func The function to debounce.
 * @param wait The number of milliseconds to delay.
 * @returns A new debounced function.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Creates a throttled function that only invokes the provided function at most once per every wait milliseconds.
 * @param func The function to throttle.
 * @param wait The number of milliseconds to wait before allowing the function to be invoked again.
 * @returns A new throttled function.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let lastCallTime: number | null = null;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    const now = Date.now();

    if (lastCallTime === null || now - lastCallTime >= wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      func(...args);
      lastCallTime = now;
    } else if (!timeout) {
      timeout = setTimeout(
        () => {
          func(...args);
          lastCallTime = Date.now();
          timeout = null;
        },
        wait - (now - lastCallTime),
      );
    }
  };
}
