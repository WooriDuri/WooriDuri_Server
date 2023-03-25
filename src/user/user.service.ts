import { UpdateUserDto } from './../dto/update-user.dto';
import { InvalidStatusException } from './../exception/invalidStatusException';
import { LoginUserDto } from './../dto/login-user.dto';
import { CreateUserDto } from './../dto/create-user.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { Do } from 'src/exception/do';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  //*회원가입
  async sginup(createUserDto: CreateUserDto) {
    try {
      const existUser = await this.userRepository.findOne({
        email: createUserDto.email,
      });
      if (existUser) {
        throw new HttpException('존재하는 유저입니다.', 400);
      }
      // Do.require(!existUser, '존재하는유저입니다.');
      const hash = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userRepository.create();
      user.email = createUserDto.email;
      user.name = createUserDto.name;
      user.password = hash;
      await this.userRepository.save(user);
      return this.myprofile(user);
    } catch (e) {
      console.log(e);
      throw new HttpException(e, 400);
    }
  }
  //*프로필조회
  async myprofile(user: UserEntity) {
    const profile = await this.userRepository
      .createQueryBuilder('user')
      .where({ id: user.id })
      .select(['user.email', 'user.name', 'user.id'])
      .getOne();
    return profile;
  }

  //*프로필수정
  async profileUpdate(user: UserEntity, updateUserDto: UpdateUserDto) {
    try {
      const profile = await this.myprofile(user);
      if (!profile) {
        throw new HttpException('잘못된 요청입니다.', 400);
      }
      // Do.require(!!profile, '잘못된 요청입니다.');
      profile.name = updateUserDto.name;
      await this.userRepository.save(profile);
      return true;
    } catch (e) {
      console.log(e);
      throw new HttpException(e, 400);
    }
  }

  //*exist
  async existUser(userId: number) {
    try {
      const existUser = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!existUser) {
        throw new HttpException('존재하지 않는 유저입니다.', 400);
      }
      return true;
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }
}
