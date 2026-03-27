import { Controller, Post, Body, UnauthorizedException, HttpStatus, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UtilService } from 'src/common/services/util.service';
import { LoginDto } from './dto/login';
//import { AuthGuard } from 'src/common/guards/auth.guard';
//import { User } from '../user/entities/user.entity';
import { AppException } from 'src/common/exceptions/app.exception';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { request } from 'http';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authSvc: AuthService,
    private readonly utilSvc: UtilService,
  ) {}

  @Post('login')
  public async login(@Body() auth: LoginDto): Promise<any> {
    const { username, password } = auth;
    
    // Buscar al usuario por nombre de usuario
    const user = await this.authSvc.getUserByUsername(username);

    // Si el usuario no existe, lanzar excepción
    if (!user) {
      throw new UnauthorizedException('el usuario y/o contraseña no existen');
    }

    // Validar si la contraseña es correcta
    if (!(await this.utilSvc.checkPassword(password, user.password))) {
      throw new UnauthorizedException('el usuario y/o contraseña no existen');
    }

    // Desestructuración para separar el password del resto de los datos del usuario (payload)
    const { password: _, ...payload } = user;

    // Generar refresh token (expira en 7 días según el parámetro '7d')
    const refreshToken = await this.utilSvc.generateJWTPayload(payload, '7d');
    const hash = await this.utilSvc.hash(refreshToken)
    await this.authSvc.updateHash(user.id, hash);
    payload.hash = hash;

    // Generar token de acceso (expira en 1 hora según el parámetro '1h')
    const jwt = await this.utilSvc.generateJWTPayload(payload, '1h');

    // Devolver la información al cliente
    return {
      access_token: jwt,
      refresh_token: refreshToken,
    };
  }
}

  @Get("me")
  @ApiOperation({summary:"Extrae el id del usuario desde el token y busca la imformacion"})
  @UseGuards(AuthGuard)
  public getProfile(@Req()){}

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  public refreshToken(@Req() request:any){
    // Obtener el usuario en sesion
    const userSession = request('user');
    const user = await this.authSvc.getUserById(userSession.id);
    if (!user || !user.hash) throw new AppException('Acceso denegado', HttpStatus.FORBIDDEN,'0');

    //Comparar el token recibido con el token guardado
    if(userSession.hash != user.hash)throw new AppException('Token invalido',HttpStatus.FORBIDDEN);

    //FIXME: Si el token es valido se generan nuevos tokens
    return{
      access_token: '',
      refresh_token: ''
    }
    

     @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  public logout(@Req() request: any){
    const session = request('user');
    const user= await this.authSvc.updateHash(session.id,null);
    return user;

  }
  }

 

