import { cosmiconfigSync } from "cosmiconfig";
import * as commit from "./cui/commit";
import * as terminal from "./cui/terminal";
import type { Setting } from "./domain/type";
import * as answerValidator from "./useCase/answerValidator";
import * as workFlow from "./useCase/workFlow";

type Main = (p: Setting) => Promise<void>;
export const main: Main = async (
  p = cosmiconfigSync("commitMSG").search()?.config
) => {
  const question = workFlow.getQuestion(p);
  const template = p.config.createTpl(p);
  const isDone = workFlow.isDone(question);

  if (isDone) {
    return Promise.resolve(template)
      .then((msg) => commit.setMsg({ msg }))
      .finally(terminal.clear);
  }

  const answerVO = await terminal.renderingQnA({ ...p, question });

  const mayBeAnswer = answerValidator.valid({
    answerVO,
    questionName: question.name,
  });

  if (mayBeAnswer.isErr) {
    throw new Error(mayBeAnswer.error.reason);
  }

  const { answer } = mayBeAnswer.value;

  const newTemplate = workFlow.updateTemplate({
    answer: question.overwrite ? question.overwrite(answer) : answer,
    template,
    searchValue: question.name,
  });

  return main({
    questionDictionary: p.questionDictionary,
    template: newTemplate,
    config: p.config,
  });
};
