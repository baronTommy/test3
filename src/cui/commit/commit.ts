import * as fs from "fs";

type SetMsg = (p: { msg: string }) => void;
export const setMsg: SetMsg = (p) => {
  try {
    fs.writeFileSync(process.argv[3], p.msg);
  } catch (e) {
    console.error(e);
  }
};
