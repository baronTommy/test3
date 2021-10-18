export const write = (msg: string) =>
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("fs").writeFileSync(process.argv[3], msg);
