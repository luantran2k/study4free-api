import { Exam } from '@prisma/client';

export class CreateExamDto
  implements
    Pick<Exam, 'title' | 'description' | 'duration' | 'type' | 'image'>
{
  image: string;
  title: string;
  description: string;
  duration: number;
  type: string;
}
