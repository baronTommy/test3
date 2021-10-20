import type { SearchListTypeQ, Setting } from "~/domain/core";

type P = {
  question: SearchListTypeQ;
  template: Setting["template"];
};
type MakeQuestion = (p: P) => Promise<P>;
export const makeQuestion: MakeQuestion = async (p) => ({
  ...p,
  question: { ...p.question, choices: await p.question.getChoices() },
});
