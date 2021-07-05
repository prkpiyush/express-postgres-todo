import { Request } from 'express';
import UserDto from 'src/dto/user.dto';

interface RequestWithUser extends Request {
  user: UserDto;
}

export { RequestWithUser };