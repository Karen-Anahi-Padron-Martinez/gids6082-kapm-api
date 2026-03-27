import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilService {
    constructor(private jwtService: JwtService) {} 

    public async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    public async checkPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compareSync(password, hash);
    }  

    public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    // Método para obtener el payload del token usando @nestjs/jwt
    public async getPayload(token: string): Promise<any> {
        try {
            // Verificar y decodificar el token
            const payload = this.jwtService.verify(token);
            return payload;
        } catch (error) {
            throw new Error('Token inválido');
        }
    }

    // Método para generar tokens
    public async generateToken(payload: any): Promise<string> {
        return this.jwtService.sign(payload);
    }
}