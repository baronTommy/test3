export type Question = Record<"name", string>;
export type Answer = string | number;
export type Config = {
  questionDictionary: Array<Question>;
  template: string;
};
