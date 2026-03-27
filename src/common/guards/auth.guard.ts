import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { UtilService } from '../services/util.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private utilSvc: UtilService) { }

    // Add the 'async' keyword here
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Obtener el request de la aplicacion
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        // Verificar si existe el token
        if (!token)
            throw new UnauthorizedException();

        try {
            // Si el token existe verificar el tiempo de expiracion
            const payload = await this.utilSvc.getPayload(token);
            // Si el token es funcional agregar el user{payload}
            request['user'] = payload;
            // devolver el resultado
            return true;
        } catch {
            throw new UnauthorizedException();
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type == 'Bearer' ? token : undefined;
    }
}