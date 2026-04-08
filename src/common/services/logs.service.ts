import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; // Ajusta esta ruta a tu servicio de Prisma

@Injectable()
export class LogsService {
  // En Prisma inyectamos el PrismaService directamente
  constructor(private readonly prisma: PrismaService) {}

  async createLog(data: any) {
    // 'logs' debe ser el nombre del modelo en tu schema.prisma (en minúsculas)
    return await this.prisma.logs.create({
      data: {
        path: data.path,
        statusCode: data.statusCode,
        timestamp: data.timestamp,
        error: data.error,
        errorCode: data.errorCode
        
      },
    });
  }
}

