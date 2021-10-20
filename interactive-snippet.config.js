const { github, gitmojis } = require("@tommy_baron/git-test-").plugin;

const gitmoji = gitmojis.map((v) => ({
  name: `${v.emoji} ${v.description}`,
  value: v.code,
}));

const fetchMyIssues = () =>
  github
    .fetchIssues({
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
    .then((v) => [{ name: "_NotSelected_", value: "" }, ...v])
    .catch(() => []);

/** @type {import('@tommy_baron/git-test-').Setting} */
module.exports = {
  template: `{{type}}{{(scope)}}: {{gitmoji}} {{description}}
          
{{body}}
             
{{issue}}`,
  config: {
    color: "green",
    overwriteTpl: (p) => p.template.replace(/\r?\n{2,}/g, "").trim(),
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
      name: "(scope)",
      type: "search-list",
      message: "Please select a scope.",
      getChoices: () =>
        Promise.resolve([
          { name: "_NotSelected_", value: "" },
          { name: "Domain", value: "(Domain)" },
          { name: "UseCase", value: "(UseCase)" },
          { name: "Presenter", value: "(Presenter)" },
          { name: "UI", value: "(UI)" },
        ]),
    },
    {
      name: "gitmoji",
      type: "search-list",
      message: "gitmojiを選択してください。",
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
    },
    {
      name: "issue",
      type: "search-list",
      message: "Close the issue?",
      getChoices: fetchMyIssues,
      overwriteAnswer: (ans) => (ans ? `Close #${ans}` : ""),
    },
  ],
};
