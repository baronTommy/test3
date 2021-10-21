import type { ForegroundColor } from "chalk";

export type Answer = string;

type QuestionBase = {
  name: string;
  message: string;
  overwriteAnswer?: (p: Answer) => Answer;
  overwriteTpl?: (p: Setting["template"]) => Setting["template"];
};

export type SearchListTypeQ = {
  type: "search-list";
  getChoices: () => Promise<Array<{ name: string; value: string }>>;
} & QuestionBase;

export type InputTypeQ = {
  type: "input";
} & QuestionBase;

export type Question = SearchListTypeQ | InputTypeQ;

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
  };
};
