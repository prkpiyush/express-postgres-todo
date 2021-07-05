import { IsString, IsEmail } from 'class-validator';

class UserDto {
  @IsString()
  id: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export default UserDto;