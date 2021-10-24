const { github, gitmojis } = require("@tommy_baron/git-test-").plugin;

const notSelected = { description: "_NotSelected_", value: "" };

const gitmoji = gitmojis.map((v) => ({
  description: `${v.emoji} ${v.description}`,
  value: v.code,
}));

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
        description: `#${issue.number}: ${issue.title}`,
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
        /**
         * https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional
         */
        [
          { description: "feat: New feature", value: "feat" },
          { description: "fix: Bug fix", value: "fix" },
          { description: "docs: Documentation only changes", value: "docs" },
          {
            description:
              "style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
            value: "style",
          },
          {
            description:
              "refactor: Code change that neither fixes a bug nor adds a feature",
            value: "refactor",
          },
          {
            description: "perf: Code change that improves performance",
            value: "perf",
          },
          {
            description:
              "test: Adding missing tests or correcting existing tests",
            value: "test",
          },
          {
            description:
              "build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)",
            value: "build",
          },
          {
            description:
              "ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)",
            value: "ci",
          },
          {
            description:
              "chore: Other changes that don't modify src or test files",
            value: "chore",
          },
          {
            description: "revert: Reverts a previous commit",
            value: "revert",
          },
        ],
    },
    {
      name: "scope",
      type: "search-list",
      message: "Please select a scope.",
      getChoices: () => [
        notSelected,
        { description: "UserInterface", value: "UserInterface" },
        { description: "Interface", value: "Interface" },
        { description: "UseCase", value: "UseCase" },
        { description: "Domain", value: "Domain" },
      ],
      overwriteTpl: (tpl) => tpl.replace("()", ""),
    },
    {
      name: "gitmoji",
      type: "search-list",
      message: "Please select a gitmoji",
      getChoices: () => gitmoji,
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
