import type { ForegroundColor } from "chalk";
import type { QuestionCollection } from "inquirer";

export type Answer = string;

export type Question = QuestionCollection & {
  name: string;
  choices?: Array<{ name: string; value: string }>;

  // extend
  overwriteAnswer?: (p: Answer) => Answer;
  choicesGetter?: () => Promise<Question["choices"]> | Question["choices"];
  //
};

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
     * Format the template after answering.
     */
    createTpl: (p: Setting) => Setting["template"];
  };
};
