export type Question = {
  name: string;
  overwrite?: (p: string) => string;
};
export type Answer = string | number;
export type Config = {
  questionDictionary: Array<Question>;
  template: string;
};
