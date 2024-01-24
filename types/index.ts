export type NavItem = {
  label: string;
  path: string;
  icon?: string;
  children?: NavItem[];
}
export type Questionnaire = {
  id: number;
  title?: string;
  questions: Question[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type Question = {
  id: number;
  title: string;
  imageUrl?: string;
  answers: Answer[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type Answer = {
  id: number;
  title: string;
  isCorrect?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}