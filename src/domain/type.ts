export type Question = {
  name: string;
  fmt?: (p: string) => string;
};
export type Answer = string | number;
export type Config = {
  questionDictionary: Array<Question>;
  template: string;
};
