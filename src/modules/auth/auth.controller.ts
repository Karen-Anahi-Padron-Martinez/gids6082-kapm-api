import { Body,Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { LoginDto } from './dto/login';
import { User } from '../user/entities/user.entity';

@Controller('api/auth')
export class AuthController {
  constructor(private authSvc: AuthService) {}

@Post('login')
@ApiOperation({ summary: 'Login de usuario' })
public async login(@Body() user: LoginDto): Promise<User> {

    const result = await this.authSvc.login(user);

    if (result == undefined || result == null) {
        throw new HttpException(
            `Usuario o contraseña incorrectos`,
            HttpStatus.UNAUTHORIZED,
        );
    }

    return result;
}

  @Get("me")
  @ApiOperation({ summary: "Extrae el ID del usuario desde el token y busca la informacion"})
  public getProfile(){}

  public refreshToken(){}
}
