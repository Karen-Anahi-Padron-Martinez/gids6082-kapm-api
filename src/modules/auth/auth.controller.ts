import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('api/auth')
export class AuthController {
  constructor(private authSvc: AuthService) {}

  @Get()
  public login(): string {
    return this.authSvc.login();
  }

  @Get("me")
  @ApiOperation({ summary: "Extrae el ID del usuario desde el token y busca la informacion"})
  public getProfile(){}

  public refreshToken(){}
}
