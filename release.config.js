const conf = require("./interactive-commit.config");

module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {
          types: [
            ...conf.questionDictionary.map((v) => ({
              type: v.type,
              section: v.type.toUpperCase(),
              hidden: false,
            })),
            { type: "", section: "-", hidden: false },
          ],
        },
      },
    ],
    "@semantic-release/github",
    "@semantic-release/npm",
    "@semantic-release/git",
  ],
};
