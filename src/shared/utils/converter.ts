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

export { toString, toBool, toNumber };
