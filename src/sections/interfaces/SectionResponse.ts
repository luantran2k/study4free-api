import { SectionType } from 'src/exams/types/sections.type';

export type QuestionType =
  | 'Single choice'
  | 'Multiple choice'
  | 'Gap filling'
  | 'Information identification'
  | 'Information matching'
  | 'Head Matching'
  | 'Sentence completion'
  | 'Summary completion';
export default interface ISectionResponse {
  id: string;
  examId: string;
  title: string;
  section: SectionType; //"Listening" | "Reading" | "Writing" | "Speaking"
  questions: {
    id: string;
    questionType: QuestionType;
    answers: {
      id: string;
      value?: string;
      isTrue?: boolean;
      audio?: string;
    }[];
  }[];
}
