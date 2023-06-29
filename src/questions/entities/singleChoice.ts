import ISingleChoiceAnswer from 'src/answers/interfaces/singleChoiceAnswer';
import { Question } from './question';

export class SingleChoiceQuestion extends Question {
  private answers: ISingleChoiceAnswer[];
  private userAnswers: ISingleChoiceAnswer[];
  constructor(
    id: string,
    answers: ISingleChoiceAnswer[],
    userAnswers: ISingleChoiceAnswer[],
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
