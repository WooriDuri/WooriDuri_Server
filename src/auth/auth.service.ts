import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './../repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { Do } from 'src/exception/do';
import * as bcrypt from 'bcrypt';
import { Connection, Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';

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
      where: { eamil: email },
    });
    Do.require(!existEmail, '이메일 비밀전호를 확인하세요');
    const isValidatePassword: boolean = await bcrypt.compare(
      loginUserDto.password,
      existEmail.password,
    );
    Do.require(!isValidatePassword, '이메일 비밀번호를 확인하세요');

    const payload = { email: email, id: existEmail.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
