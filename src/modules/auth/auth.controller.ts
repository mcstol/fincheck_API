import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDTO } from './dto/authenticate.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  authenticate(@Body() authenticateDTO: AuthenticateDTO) {
    return this.authService.authenticate(authenticateDTO);
  }
}
