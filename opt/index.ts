import * as github from "./plugin/github";
import { gitmojis } from "./plugin/gitmoji";
import { conventionalCommitsGitmoji } from "./setting/conventionalCommitsGitmoji";

export const plugin = {
  gitmojis,
  github,
};

export const setting = {
  conventionalCommitsGitmoji,
};
