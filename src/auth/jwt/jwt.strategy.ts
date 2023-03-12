import { UserRepository } from './../../repository/user.repository';
import { UserEntity } from './../../entity/user.entity';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Do } from 'src/exception/do';

interface Payload {
  email?: string;
  id: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETKEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where({ id: payload.id })
      .select('-password')
      .getOne();

    Do.require(!!user, '접근 오류');
    return user;
  }
}
