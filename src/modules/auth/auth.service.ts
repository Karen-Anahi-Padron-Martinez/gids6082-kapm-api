import { Injectable } from '@nestjs/common';
import { UtilService } from 'src/common/services/util.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login';
import { User } from 'src/modules/user/entities/user.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private utilService: UtilService,
    private jwtService: JwtService
  ) {}

  public async getUserByUsername(username: string): Promise <User | null> {
    return await this.prisma.user.findFirst({
      where: {username}
    });
  }

  public async getUserById (id: number): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {id}
    });
  }

  public async updateHash(user_id: number, hash: string | null): Promise<User> {
    return await this.prisma.user.update({
      where: {id: user_id},
      data : {hash}
    });
  }
}