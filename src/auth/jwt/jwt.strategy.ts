import { AuthService } from './../auth.service';
import { UserRepository } from './../../repository/user.repository';
import { UserEntity } from './../../entity/user.entity';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Do } from 'src/exception/do';

interface Payload {
  email?: string;
  id: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETKEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const user = await this.authService.validateUser(payload);
    console.log(user, payload);
    Do.require(!!user, '접근 오류');
    return user;
  }
}
