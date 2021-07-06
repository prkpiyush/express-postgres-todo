import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import UserDto from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { BadRequest } from '../helpers/error';

class UserService {
  async createUser(user: UserDto): Promise<User> {
    const userRepository = getRepository(User);
    const pass = await this.hashPassword(user.password);
    const userData: User = {
      email: user.email,
      password: pass
    } as User;

    return userRepository.save(userData);
  }

  async findUser(user: UserDto): Promise<User> {
    const userRepository = getRepository(User);
    const userInDB = await userRepository.findOne({ where: { email: user.email } });

    if (userInDB) {
      const match = await this.comparePassword(user.password, userInDB.password);
      if (match) {
        return userInDB;
      }

      throw new BadRequest('Incorrect password');
    }

    return null;
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const pass = await bcrypt.hash(password, salt);
    return pass;
  }

  private async comparePassword(enteredPassword: string, savedPassword: string) {
    const auth = await bcrypt.compare(enteredPassword, savedPassword);
    return auth;
  }
}

export default new UserService();