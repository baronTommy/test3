import type { Question } from "~/domain/core";
import * as WorkFlow from "~/domain/workFlow";

export const getQuestion: WorkFlow.GetQuestion = (p) =>
  p.questionDictionary.shift();

export const isDone = (p: Question | undefined): p is undefined =>
  p === undefined;

export const updateTemplate: WorkFlow.UpdateTemplate = (p) =>
  p.template.replace(`{{${p.searchValue}}}`, p.answer);
