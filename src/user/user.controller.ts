import { UpdateUserDto } from './../dto/update-user.dto';
import { UserEntity } from './../entity/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './../auth/auth.service';
import { LoginUserDto } from './../dto/login-user.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { CurrentUser } from 'src/decorator/user.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto } from 'src/dto/read-user.dto';
import { SuccessInterceptor } from 'src/interceptor/success.interceptor';

@Controller('user')
@UseInterceptors(SuccessInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  //*회원가입
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 500,
    description: 'server error',
  })
  @ApiResponse({
    status: 201,
    description: '성공',
    type: UserDto,
  })
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.sginup(createUserDto);
  }
  //*로그인
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  //*프로필조회
  @ApiOperation({ summary: '프로필조회' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @Get('myprofile')
  @UseGuards(AuthGuard())
  myprofile(@CurrentUser() user: UserEntity) {
    console.log('!23');
    return this.userService.myprofile(user);
  }

  //*프로필수정
  @ApiOperation({ summary: '프로필수정' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @Put('updateProfile')
  @UseGuards(AuthGuard())
  profileUpdate(
    @CurrentUser() user: UserEntity,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    return this.userService.profileUpdate(user, updateUserDto);
  }
}
