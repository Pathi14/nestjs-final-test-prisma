import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async addUser(email: string): Promise<void> {
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new ConflictException(`User with email ${email} already exists`);
        }

        await this.prisma.user.create({
            data: { email },
        });
    }

    async getUser(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async getUserById(userId: number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
    }

    async resetData(): Promise<void> {
        await this.prisma.task.deleteMany();
        await this.prisma.user.deleteMany();
    }       
}