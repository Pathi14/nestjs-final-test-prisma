import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    async addTask(name: string, userId: number, priority: number): Promise<void> {
      const existingUser = this.verifyExistenceUser(userId);
      if (!existingUser) {
          throw new Error(`User with id ${userId} not found`);
      }

      await this.prisma.task.create({
          data: {
              name,
              user: {
                  connect: { id: userId },
              },
              priority,
          },
      });
    }

    async getTaskByName(name: string): Promise<Task | undefined> {
        return this.prisma.task.findFirst({
            where: { name },
        });
    }

    async getUserTasks(userId: number): Promise<Task[]> {
        const existingUser = this.verifyExistenceUser(userId);
        if (!existingUser) {
            throw new Error(`User with id ${userId} not found`);
        }
        return this.prisma.task.findMany({
            where: { userId },
        });
    }

    async resetData(): Promise<void> {
      await this.prisma.task.deleteMany();
    }

    async verifyExistenceUser(userId: number): Promise<boolean> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        return !!user;
    } 
}
