export interface Question {
  id: string;
  statement: string;
  answer: "reyal" | "faki";
  category: string;
  difficulty: "easy" | "medium" | "hard" | "expert";
  explanation?: string;
}
export type Category =
  | "science"
  | "history"
  | "entertainment"
  | "sports"
  | "technology"
  | "animals";

export type Difficulty = "easy" | "medium" | "hard" | "expert";