import type { Answer, Config, Question } from "~/domain/type";

export const getQuestion = (p: Config) => p.questionDictionary.shift();
export const fmtTpl = (p: Config) =>
  p.template.replace(/\r?\n{2,}/g, "").trim();

export const fmtAnswer = (p: Answer) =>
  typeof p === "number" ? Number(p).toString() : p;

export const isDone = (p: Question | undefined): p is undefined =>
  p === undefined;

export const margeTemplate = (p: {
  template: Config["template"];
  searchValue: string;
  answer: string;
}) => p.template.replace(`{{${p.searchValue}}}`, p.answer);
