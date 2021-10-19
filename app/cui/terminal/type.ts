import type { Answer, Question } from "~/domain/core";

export type AnswerLike = Answer | number;
export type AnswerVO = Record<Question["name"], AnswerLike>;
