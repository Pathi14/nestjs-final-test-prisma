import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    async addTask(name: string, userId: number, priority: number): Promise<void> {
      const user = await this.prisma.user.findUnique({
          where: { id: userId },
      });
      if (!user) {
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
      return this.prisma.task.findMany({
          where: { userId },
      });
    }

    async resetData(): Promise<void> {
      await this.prisma.task.deleteMany();
    }
}
