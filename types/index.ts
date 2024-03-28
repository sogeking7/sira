export type User = {
  id: string;
  phone: string;
};

export type NavItem = {
  label: string;
  path: string;
};

export type Questionnaire = {
  id: number;
  title: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
};

export type Question = {
  id: number;
  title: string;
  imageUrl: string;
  answers: Answer[];
};

export type Answer = {
  id: number;
  title: string;
  isCorrect?: boolean;
};

export type Token = string | null;
