import * as inquirer from "inquirer";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as inquirerAutocompletePrompt from "inquirer-search-list";
import { table } from "table";
import type { Config, Question } from "~/domain/type";
inquirer.registerPrompt("search-list", inquirerAutocompletePrompt);

export const clear = console.clear;

export const renderTpl = (p: Pick<Config, "template">) => {
  const data = [
    [
      p.template
        .replace(new RegExp("{{", "g"), "")
        .replace(new RegExp("}}", "g"), ""),
    ],
  ];

  console.log(
    table(data, {
      header: {
        alignment: "center",
        content: "Your template",
      },
    })
  );
};

export const qAndA = (p: {
  question: Question;
  template: Config["template"];
}) => inquirer.prompt(p.question);
