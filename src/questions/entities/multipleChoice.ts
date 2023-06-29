import IMultipleChoiceAnswer from 'src/answers/interfaces/multipleChoiceAnswer';
import { Question } from './question';

export class MultipleChoiceQuestion extends Question {
  private answers: IMultipleChoiceAnswer[];
  private userAnswers: IMultipleChoiceAnswer[];
  constructor(
    id: string,
    answers: IMultipleChoiceAnswer[],
    userAnswers: IMultipleChoiceAnswer[],
  ) {
    super(id);
    this.answers = answers;
    this.userAnswers = userAnswers;
  }
  validate() {
    const answersObj: {
      [key: string]: {
        isTrue: boolean;
        value: string;
      };
    } = this.answers.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.id]: {
          isTrue: cur.isTrue,
          value: cur.value,
        },
      }),
      {},
    );
    const isTrue = this.userAnswers.every(
      (answer) =>
        Boolean(answer.isTrue) == Boolean(answersObj[answer.id].isTrue),
    );
    return isTrue;
  }
}
