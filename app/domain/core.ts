import type { ForegroundColor } from "chalk";

export type Answer = string;

type QuestionBase = {
  name: string;
  message: string;
  overwriteAnswer?: (p: Answer) => Answer;
};

type SearchList = {
  type: "search-list";
  getChoices: () => Promise<Array<{ name: string; value: string }>>;
} & QuestionBase;

type Input = {
  type: "input";
} & QuestionBase;

export type Question = SearchList | Input;

export type Setting = {
  /**
   * - https://github.com/SBoudrias/Inquirer.js
   * - https://github.com/robin-rpr/inquirer-search-list
   */
  questionDictionary: Array<Question>;
  template: string;
  config: {
    /**
     * https://github.com/chalk/chalk#colors
     */
    color: typeof ForegroundColor;
    /**
     * Format the template before answering.
     */
    overwriteTpl?: (p: Setting) => Setting["template"];
  };
};
