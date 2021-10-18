import * as inquirer from "inquirer";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as inquirerAutocompletePrompt from "inquirer-search-list";
import type { Config, Question } from "~/domain/type";
inquirer.registerPrompt("search-list", inquirerAutocompletePrompt);

export const clear = console.clear;

export const renderTpl = (p: Pick<Config, "template">) => {
  console.log("-----------");
  console.log(
    p.template
      .replace(new RegExp("{{", "g"), "")
      .replace(new RegExp("}}", "g"), "")
  );
  console.log("-----------");
};

export const qAndA = (p: {
  question: Question;
  template: Config["template"];
}) => inquirer.prompt(p.question);
