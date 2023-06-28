import IAnswer from './answer';

export default interface ISpeakingAnswer extends IAnswer {
  audio: string;
}
