/**
 * filename
 *
 * https://github.com/davidtheclark/cosmiconfig
 */

const template = `{{type}}{{(scope)}}: {{description}}
    
{{body}}
    
{{footer}}`;

/**
 * - https://github.com/SBoudrias/Inquirer.js
 * - https://github.com/robin-rpr/inquirer-search-list
 */
const questionDictionary = [
  {
    name: "type",
    type: "search-list",
    message: "typeを選択してください。",
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
    type: "search-list",
    message: "scopeを選択してください。",
    choices: [
      { name: "未選択", value: "" },
      { name: "Domain", value: "(Domain)" },
      { name: "UI", value: "(UI)" },
    ],
  },
  {
    name: "description",
    type: "input",
    message: "descriptionを入力してください。",
  },
  {
    name: "body",
    type: "input",
    message: "bodyを入力してください。",
  },
  {
    name: "footer",
    type: "input",
    message: "footerを入力してください。",
  },
];

module.exports = {
  template,
  questionDictionary,
};
