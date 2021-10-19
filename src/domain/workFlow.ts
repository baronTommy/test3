import type { Answer, Question, Setting } from "./core";

export type GetQuestion = (p: Setting) => Question | undefined;
export type UpdateTemplate = (p: {
  template: Setting["template"];
  searchValue: string;
  answer: Answer;
}) => Setting["template"];
