import type { SearchListTypeQ, Setting } from "~/domain/core";

type P = {
  question: SearchListTypeQ;
  template: Setting["template"];
};
type MakeQuestion = (p: P) => Promise<P>;
export const makeQuestion: MakeQuestion = async (p) => {
  const choices = await p.question.getChoices().then((r) =>
    r.map((v) => ({
      ...v,
      name: v.description,
    }))
  );
  return {
    ...p,
    question: { ...p.question, choices },
  };
};
