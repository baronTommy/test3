import * as github from "./plugin/github";
import { gitmojis } from "./plugin/gitmoji";
import { conventionalCommit } from "./setting/conventionalCommit";

export const plugin = {
  gitmojis,
  github,
};

export const setting = {
  conventionalCommit,
};
