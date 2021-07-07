import { IsString, IsBoolean } from 'class-validator';

class TodoDTO {
  @IsString()
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  isComplete: boolean;
}

export default TodoDTO;
