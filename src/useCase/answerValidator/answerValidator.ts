import type { AnswerLike, AnswerVO, FmtAnswer, Question } from "~/domain/type";

const isValid = (p: unknown): p is AnswerLike =>
  typeof p === "string" || typeof p === "number";

const fmtAnswer: FmtAnswer = (p: AnswerLike) =>
  typeof p === "number" ? Number(p).toString() : p;

type Valid = (p: { answerVO: AnswerVO; questionName: Question["name"] }) =>
  | {
      isErr: false;
      value: {
        answer: string;
      };
    }
  | {
      isErr: true;
      error: {
        reason: string;
      };
    };
export const valid: Valid = (p) => {
  const mayBeAnswer = p.answerVO[p.questionName];

  if (isValid(mayBeAnswer)) {
    return {
      isErr: false,
      value: { answer: fmtAnswer(mayBeAnswer) },
    };
  }

  return {
    isErr: true,
    error: {
      reason: "The answer need to be string or number.",
    },
  };
};
