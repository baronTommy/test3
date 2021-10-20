import type { InputTypeQ, Setting } from "~/domain/core";

type P = {
  question: InputTypeQ;
  template: Setting["template"];
};
type MakeQuestion = (p: P) => Promise<P>;
export const makeQuestion: MakeQuestion = (p) => Promise.resolve(p);
