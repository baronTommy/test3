const { github, gitmojis } = require("@tommy_baron/git-test-").plugin;

const notSelected = { name: "_NotSelected_", value: "" };

const gitmoji = [
  notSelected,
  gitmojis.map((v) => ({
    name: `${v.emoji} ${v.description}`,
    value: v.code,
  })),
];

/**
 * https://github.com/octokit/rest.js/
 */
const fetchMyIssues = () =>
  github
    .fetchIssues({
      // TODO リネーム
      owner: "baronTommy",
      repo: "test3",
      state: "open",
    })
    .then((r) =>
      r.data.map((issue) => ({
        name: `#${issue.number}: ${issue.title}`,
        value: `${issue.number}`,
      }))
    )
    .then((v) => [notSelected, ...v])
    .catch(() => []);

/**
 * @type {import('@tommy_baron/git-test-').Setting}
 */
module.exports = {
  /**
   * The part that matches questionDictionary.name will be replaced.
   */
  template: `{{type}}({{scope}}): {{gitmoji}} {{description}}
          
{{body}}
             
{{issue}}`,
  config: {
    /**
     * This is the theme color of the terminal.
     */
    color: "green",
  },
  questionDictionary: [
    {
      name: "type",
      type: "search-list",
      message: "Please select a type.",
      getChoices: () =>
        Promise.resolve([
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
        ]),
    },
    {
      name: "scope",
      type: "search-list",
      message: "Please select a scope.",
      getChoices: () =>
        Promise.resolve([
          notSelected,
          { name: "Interface", value: "Interface" },
          { name: "UserInterface", value: "UserInterface" },
          { name: "UseCase", value: "UseCase" },
          { name: "Domain", value: "Domain" },
        ]),
      overwriteTpl: (tpl) => tpl.replace("()", ""),
    },
    {
      name: "gitmoji",
      type: "search-list",
      message: "Please select a gitmoji",
      getChoices: () => Promise.resolve(gitmoji),
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
      overwriteTpl: (tpl) => tpl.replace(/\r?\n{2,}/g, "").trim(),
    },
    {
      name: "issue",
      type: "search-list",
      message: "Close the issue?",
      /**
       * Get the issue.
       */
      getChoices: fetchMyIssues,
      overwriteAnswer: (ans) => (ans ? `Close #${ans}` : ""),
      overwriteTpl: (tpl) => tpl.replace(/\r?\n{2,}/g, "").trim(),
    },
  ],
};
