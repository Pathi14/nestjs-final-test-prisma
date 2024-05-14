import { Controller, Post, Body, Get, BadRequestException, ConflictException, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() body: { name: string; userId: number; priority: string }) {
    const { name, userId, priority } = body;
    if (!name || !userId || !priority) {
      throw new BadRequestException('Missing required fields');
    }
    if (typeof name !== 'string' || typeof userId !== 'number' || typeof priority !== 'string') {
      throw new BadRequestException('Invalid data types');
    }

    const priorityNumber = parseInt(priority);

    try {
      await this.taskService.addTask(name, userId, priorityNumber);
      return { message: 'Task created successfully' };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Invalid request');
    }
  }

  @Get('user/:userId')
  async getUserTasks(@Param('userId') userId: string): Promise<Task[]> {
    const parsedUserId = parseInt(userId, 10); // Convertir la chaîne en nombre
    if (isNaN(parsedUserId) || parsedUserId < 0) {
      throw new BadRequestException('Invalid userId');
    }
    return this.taskService.getUserTasks(parsedUserId);
  }

  @Get(':name')
  async getTaskByName(@Param('name') name: string): Promise<Task | undefined> {
    return this.taskService.getTaskByName(name);
  }

}
