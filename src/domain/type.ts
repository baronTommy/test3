import type { ForegroundColor } from "chalk";

export type Question = {
  name: string;
  overwrite?: (p: string) => string;
};

export type Setting = {
  questionDictionary: Array<Question>;
  template: string;
  config: {
    color: typeof ForegroundColor;
    createTpl: (p: Setting) => Setting["template"];
  };
};

export type AnswerLike = string | number;
export type AnswerVO = Record<Question["name"], AnswerLike>;
export type FmtAnswer = (p: AnswerLike) => string;

export type GetQuestion = (p: Setting) => Question | undefined;

export type UpdateTemplate = (p: {
  template: Setting["template"];
  searchValue: string;
  answer: string;
}) => Setting["template"];
