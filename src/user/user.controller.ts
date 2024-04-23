import { Controller, Post, Body, BadRequestException, ConflictException, Get } from '@nestjs/common';
import { UserService } from './user.service';

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
      await this.userService.addUser(body.email);
      return { message: 'User created successfully' };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Invalid request');
    }
  }
  @Get()
  async getUsers() {
    return this.userService.getAllUsers();
  }
  
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
