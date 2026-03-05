import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { AuthenticateDTO } from './dto/authenticate.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(authenticateDTO: AuthenticateDTO) {
    const { email, password } = authenticateDTO;

    const user = await this.usersRepo.findByEmail({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
    });

    return { accessToken };
  }
}
