import { IsString, IsEmail } from 'class-validator';

class UserDto {
  @IsString()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export default UserDto;