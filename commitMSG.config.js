// module.exports =
//   require("@tommy_baron/git-test-").setting.conventionalCommitsGitmoji;

const fetchMyIssues = () =>
  require("@tommy_baron/git-test-")
    .plugin.github.fetchIssues({
      owner: "octokit", // 取得対象とする組織 (organization)
      repo: "rest.js", // 取得対象のリポジトリ名
      state: "open", // オープン状態のIssueだけ取得
      per_page: 5, // 1リクエストごとのデータ数（デフォルト:30、最大:100）
    })
    .then((r) =>
      r.data.map((issue) => ({
        name: `#${issue.number}: ${issue.title}`,
        value: issue.number,
      }))
    )
    .catch(() => []);

const gitmojis = require("@tommy_baron/git-test-").plugin.gitmojis.map((v) => ({
  name: `${v.emoji} ${v.description}`,
  value: v.code,
}));

module.exports = {
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
      choices: gitmojis,
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      type: "search-list",
      message: "Close the issue?",
      choicesGetter: fetchMyIssues,
      overwriteAnswer: (ans) => (ans ? `Close #${ans}` : ""),
    },
  ],
};
