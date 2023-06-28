export abstract class Question {
  id: string;
  abstract validate(): boolean;
  constructor(id: string) {
    this.id = id;
  }
}
