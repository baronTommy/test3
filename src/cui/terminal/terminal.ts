import * as chalk from "chalk";
import * as inquirer from "inquirer";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as inquirerAutocompletePrompt from "inquirer-search-list";
import { table } from "table";
import type { Config, Question } from "~/domain/type";
inquirer.registerPrompt("search-list", inquirerAutocompletePrompt);

export const clear = console.clear;

export const renderTpl = (
  p: Pick<Config, "template"> & Pick<Question, "name">
) => {
  const data = [
    [
      p.template
        .replace(new RegExp(`${p.name}`), chalk.inverse.yellow(p.name))
        .replace(new RegExp("{{", "g"), "")
        .replace(new RegExp("}}", "g"), ""),
    ],
  ];

  const content = table(data, {
    header: {
      alignment: "center",
      content: chalk.bold("Your template"),
    },
  });

  console.log(content);
};

export const qAndA = (p: {
  question: Question;
  template: Config["template"];
}) => inquirer.prompt(p.question);
