import type { Setting } from "~/domain/type";
import * as gitmoji from "~/user/plugin/gitmoji";

export const conventionalCommitsGitmoji: Setting = {
  template: `{{type}}{{(scope)}}: {{gitmoji}} {{description}}
    
{{body}}
       
{{issue}}`,
  config: {
    color: "green",
    createTpl: (p) => p.template.replace(/\r?\n{2,}/g, "").trim(),
  },
  questionDictionary: [
    {
      name: "type",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      type: "search-list",
      message: "Please select a type.",
      choices: [
        { name: "Fix: for a bug fix.", value: "Fix" },
        {
          name: "Update: either for a backwards-compatible enhancement or for a rule change that adds reported problems.",
          value: "Update",
        },
        { name: "New: implemented a new feature.", value: "New" },
        {
          name: "Breaking: for a backwards-incompatible enhancement or feature.",
          value: "Breaking",
        },
        { name: "Docs: changes to documentation only.", value: "Docs" },
        { name: "Build: changes to build process only.", value: "Build" },
        { name: "Upgrade: for a dependency upgrade.", value: "Upgrade" },
        {
          name: "Chore: for refactoring, adding tests, etc. (anything that isn't user-facing).",
          value: "Chore",
        },
      ],
    },
    {
      name: "(scope)",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      type: "search-list",
      message: "Please select a scope.",
      choices: [
        { name: "_NotSelected_", value: "" },
        { name: "Domain", value: "(Domain)" },
        { name: "UseCase", value: "(UseCase)" },
        { name: "Presenter", value: "(Presenter)" },
        { name: "UI", value: "(UI)" },
      ],
    },
    {
      name: "gitmoji",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      type: "search-list",
      message: "gitmojiを選択してください。",
      choices: gitmoji.makeChoices({ gitmojis: gitmoji.gitmojis }),
    },
    {
      name: "description",
      type: "input",
      message: "Please input the description.",
    },
    {
      name: "body",
      type: "input",
      message: "Please input the body.",
    },
    {
      name: "issue",
      type: "input",
      message: "Close the issue?",
      transformer: (input) => `Close #${input}`,
      /**
       * Overwrite the answer.
       */
      overwrite: (ans) => (ans ? `Close #${ans}` : ""),
    },
  ],
};
