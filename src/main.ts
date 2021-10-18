import { cosmiconfigSync } from "cosmiconfig";
import * as commit from "./cui/commit";
import * as terminal from "./cui/terminal";
import type { Config, Question } from "./domain/type";
import * as answerValidator from "./useCase/answerValidator";
import * as workFlow from "./useCase/workFlow";

type Main = (p: {
  questionDictionary: Array<Question>;
  template: Config["template"];
}) => Promise<void>;
export const main: Main = async (
  p = cosmiconfigSync("commitMSG").search()?.config
) => {
  const question = workFlow.getQuestion(p);
  const template = workFlow.fmtTpl(p);
  const isDone = workFlow.isDone(question);

  if (isDone) {
    return Promise.resolve(template)
      .then(commit.setMsg)
      .finally(terminal.clear);
  }

  terminal.clear();
  terminal.renderTpl({ ...question, template });
  const answerObj = await terminal.qAndA({
    question,
    template,
  });

  const mayBeAnswer = answerObj[question.name];
  const answer = answerValidator.isValid(mayBeAnswer)
    ? workFlow.fmtAnswer(mayBeAnswer)
    : answerValidator.throwError();

  const newTemplate = workFlow.margeTemplate({
    answer: question.overwrite ? question.overwrite(answer) : answer,
    template,
    searchValue: question.name,
  });

  return main({
    questionDictionary: p.questionDictionary,
    template: newTemplate,
  });
};
