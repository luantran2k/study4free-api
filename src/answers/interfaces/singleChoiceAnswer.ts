import IAnswer from './answer';

export default interface ISingleChoiceAnswer extends IAnswer {
  value: string;
  isTrue: boolean;
}
