export const toCode = (input: string | number): string => {
  return "`" + input + "`";
};
export const toFat = (input: string | number): string => {
  return "**" + input + "**";
};
export const multiLine = (...args: string[]): string => {
  let out = "";
  args.forEach((e) => {
    out += e + "\n";
  });
  return out;
};
