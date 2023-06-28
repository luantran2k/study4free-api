import IAnswer from './answer';

export default interface IMultipleChoiceAnswer extends IAnswer {
  value?: string;
  isTrue: boolean;
}
