import { Inject, Injectable } from "@nestjs/common";
//import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user";
import { UpdateUserDto } from "../dto/update-user";
import { PrismaService } from "src/prisma.service";
import { User } from '@prisma/client';


@Injectable()
export class UserService {
    utilService: any;
    constructor(
  @Inject('MYSQL_CONNECTION') private connection: any,
  private prisma: PrismaService,
    ) {}


public async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
        orderBy: [{ name: 'asc' }],
    });
    return users;
}

public async getUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
        where: { id },
    });
    return user;
}

public async insertUser(user: CreateUserDto): Promise<User> {
    const newUser = await this.prisma.user.create({
        data: user,
    });
    return newUser;
}

public async updateUser(
    id: number,
    userUpdate: UpdateUserDto,
): Promise<User> {
    const userUpdated = await this.prisma.user.update({
        where: { id },
        data: userUpdate,
    });
    return userUpdated;
}

public async deleteUser(id: number): Promise<User> {
    const userDeleted = await this.prisma.user.delete({
        where: { id },
    });
    return userDeleted;
}
}


