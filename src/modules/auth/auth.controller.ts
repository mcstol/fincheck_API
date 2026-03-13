import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { AuthService } from './auth.service';
import { SigninDTO } from './dto/signin.dto';
import { SingupDto } from './dto/singup.dto';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() signin: SigninDTO) {
    return this.authService.signin(signin);
  }

  @Post('signup')
  signup(@Body() singupDto: SingupDto) {
    return this.authService.signup(singupDto);
  }
}
