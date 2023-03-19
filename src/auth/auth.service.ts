import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './../repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { Do } from 'src/exception/do';
import * as bcrypt from 'bcrypt';
import { Connection, Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';

interface Payload {
  email?: string;
  id: number;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  async login(loginUserDto: LoginUserDto) {
    try {
      const email = loginUserDto.email;
      const existEmail = await this.userRepository.findOne({
        where: { email: email },
      });

      console.log('error');
      if (!existEmail) {
        throw new HttpException('없는 유저', 400);
      }
      // Do.require(!!existEmail, '이메일 비밀전호를 확인하세요');
      const isValidatePassword: boolean = await bcrypt.compare(
        loginUserDto.password,
        existEmail.password,
      );
      if (!isValidatePassword) {
        throw new HttpException('아이디 비밀번호 확인', 400);
      }
      // Do.require(!!isValidatePassword, '이메일 비밀번호를 확인하세요');

      const payload = {
        email: email,
        name: existEmail.name,
        id: existEmail.id,
      };

      return {
        token: this.jwtService.sign(payload),
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(e, 400);
    }
  }

  async validateUser(payload: Payload) {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .where({ id: payload.id })
      .select(['user.email', 'user.name', 'user.id'])
      .getMany();
    console.log('123123', result);
    return result;
  }
}
