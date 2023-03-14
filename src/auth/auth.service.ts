import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './../repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { Do } from 'src/exception/do';
import * as bcrypt from 'bcrypt';
import { Connection, Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';

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
    const email = loginUserDto.email;
    const existEmail = await this.userRepository.findOne({
      where: { email: email },
    });
    Do.require(!!existEmail, '이메일 비밀전호를 확인하세요');
    const isValidatePassword: boolean = await bcrypt.compare(
      loginUserDto.password,
      existEmail.password,
    );
    Do.require(!!isValidatePassword, '이메일 비밀번호를 확인하세요');

    const payload = { email: email, id: existEmail.id };

    return {
      token: this.jwtService.sign(payload),
    };
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
