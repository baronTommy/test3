import * as github from "./plugin/github";
import { gitmojis } from "./plugin/gitmoji";
import { capsuleCorporation } from "./setting/capsuleCorporation";

export const plugin = {
  gitmojis,
  github,
};

export const setting = {
  capsuleCorporation,
};
