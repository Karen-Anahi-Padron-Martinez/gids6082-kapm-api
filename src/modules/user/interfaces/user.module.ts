 import { Module } from '@nestjs/common';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
//import { mysqlProvider } from 'src/common/providers/mysql.provider';
import { UtilService } from 'src/common/services/util.service';
import { PrismaService } from 'src/prisma.service';
import { mysqlProvider } from 'src/common/providers/mysql.provider';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports: [
        JwtModule.register({
          secret: 'mi_secreto_jwt',
          signOptions: { expiresIn: '60s' },
        }),
      ],
    controllers: [UserController],
    providers: [UserService, PrismaService, mysqlProvider[0],UtilService],
    
})
export class UserModule {}