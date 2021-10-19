import type { GetQuestion, Question, UpdateTemplate } from "~/domain/type";

export const getQuestion: GetQuestion = (p) => p.questionDictionary.shift();

export const isDone = (p: Question | undefined): p is undefined =>
  p === undefined;

export const updateTemplate: UpdateTemplate = (p) =>
  p.template.replace(`{{${p.searchValue}}}`, p.answer);
