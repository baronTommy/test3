import * as fs from "fs";

export const write = (msg: string) => {
  try {
    fs.writeFileSync(process.argv[3], msg);
  } catch (e) {
    console.log(e);
  }
};
