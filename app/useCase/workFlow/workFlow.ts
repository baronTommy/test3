import type { Question, Setting } from "~/domain/core";
import * as WorkFlow from "~/domain/workFlow";
import * as input from "~/useCase/qAndA/input";
import * as searchList from "~/useCase/qAndA/searchList";

export const getQuestion: WorkFlow.GetQuestion = (p) =>
  p.questionDictionary.shift();

export const isDone = (p: Question | undefined): p is undefined =>
  p === undefined;

export const updateTemplate: WorkFlow.UpdateTemplate = (p) =>
  p.template.replace(`{{${p.searchValue}}}`, p.answer);

export const findQuestion = (
  question: Question,
  template: Setting["template"]
) => {
  if (question.type === "search-list") {
    return searchList.makeQuestion({ question, template });
  }

  if (question.type === "input") {
    return input.makeQuestion({ question, template });
  }

  throw new Error("type Error");
};
