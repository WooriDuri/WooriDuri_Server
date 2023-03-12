import { UpdateUserDto } from './../dto/update-user.dto';
import { UserEntity } from './../entity/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './../auth/auth.service';
import { LoginUserDto } from './../dto/login-user.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { CurrentUser } from 'src/decorator/user.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  //*회원가입
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.sginup(createUserDto);
  }
  //*로그인
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  //*프로필조회
  @Get()
  @UseGuards(AuthGuard())
  myprofile(@CurrentUser() user: UserEntity): Promise<UserEntity> {
    return this.userService.myprofile(user);
  }

  //*프로필수정
  @Put()
  @UseGuards(AuthGuard())
  profileUpdate(
    @CurrentUser() user: UserEntity,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    return this.userService.profileUpdate(user, updateUserDto);
  }
}
