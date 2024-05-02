import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class TaskService {
    constructor() {}

    /*addTask(name: string, userId: string, priority: number): Promise<void> {
        throw new NotImplementedException();
    }

    getTaskByName(name: string): Promise<unknown> {
        throw new NotImplementedException();
    }

    getUserTasks(userId: string): Promise<unknown[]> {
        throw new NotImplementedException();
    }

    resetData(): Promise<void> {
        throw new NotImplementedException();
    }*/

    /*async addTask(name: string, userId: string, priority: number): Promise<void> {
      await prisma.task.create({
        data: {
          name,
          priority,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }
    
      async getTaskByName(name: string): Promise<any> {
        return prisma.task.findUnique({
          where: {
            name,
          },
        });
      }
    
      async getUserTasks(userId: string): Promise<any[]> {
        return prisma.task.findMany({
          where: {
            userId,
          },
        });
      }
    
      async resetData(): Promise<void> {
        // Vous pouvez implémenter la logique pour réinitialiser les données ici
      }*/
}