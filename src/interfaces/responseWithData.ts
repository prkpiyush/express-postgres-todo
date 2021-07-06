import { Response } from 'express';
import { User } from 'src/entities/user.entity';

interface ResponseWithData extends Response {
  data: any;
}

export { ResponseWithData };