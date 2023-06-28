import IGapFillingAnswer from 'src/answers/interfaces/gapFillingAnswer';
import { Question } from './question';

export class GapFillingQuestion extends Question {
  private answers: IGapFillingAnswer[];
  private userAnswers: IGapFillingAnswer[];
  constructor(
    id: string,
    answers: IGapFillingAnswer[],
    userAnswers: IGapFillingAnswer[],
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
          value: cur.value,
        },
      }),
      {},
    );
    const isTrue = this.userAnswers.every(
      (answer) => answer.value == answersObj[answer.id].value,
    );
    return isTrue;
  }
}
