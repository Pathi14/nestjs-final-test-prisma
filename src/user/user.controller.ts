import { Controller, Post, Body, Get, BadRequestException, ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: { email: string }) {
    const { email } = body;

    if (!email || !this.isValidEmail(email)) {
      throw new BadRequestException('Invalid email address');
    } 

    try {
      await this.userService.addUser(email);
      return { message: 'User created successfully' };
    } catch (error) {
        if (error instanceof ConflictException) {
            throw new ConflictException(error.message);
        }
        throw new BadRequestException('Invalid request');    
    }
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
