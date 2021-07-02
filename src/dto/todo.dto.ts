import { IsString, IsBoolean } from 'class-validator';

class TodoDTO {
  @IsString()
  id: string;

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsBoolean()
  public isComplete: boolean;
}

export default TodoDTO;