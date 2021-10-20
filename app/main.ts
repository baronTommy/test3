import { cosmiconfigSync } from "cosmiconfig";
import * as terminal from "./cui/terminal";
import type { Setting } from "./domain/core";
import * as commit from "./lib/commit";
import * as workFlow from "./useCase/workFlow";

const conf = cosmiconfigSync("interactive-snippet").search()?.config;

type Main = (p: Setting) => Promise<void>;
export const main: Main = async (p = conf) => {
  const question = workFlow.getQuestion(p);
  const template = p.config.overwriteTpl
    ? p.config.overwriteTpl(p)
    : p.template;

  if (workFlow.isDone(question)) {
    return Promise.resolve(template)
      .then((msg) => commit.setMsg({ msg }))
      .finally(terminal.clear);
  }

  const answerVO = await terminal.renderingQnA({ ...p, question });

  const mayBeAnswer = terminal.validator.valid({
    answerVO,
    questionName: question.name,
  });

  if (mayBeAnswer.isErr) {
    throw new Error(mayBeAnswer.error.reason);
  }

  const { answer } = mayBeAnswer.value;

  const newTemplate = workFlow.updateTemplate({
    answer: question.overwriteAnswer
      ? question.overwriteAnswer(answer)
      : answer,
    template,
    searchValue: question.name,
  });

  return main({
    questionDictionary: p.questionDictionary,
    template: newTemplate,
    config: p.config,
  });
};
