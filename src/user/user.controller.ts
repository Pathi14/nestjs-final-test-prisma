// src/user/user.controller.ts

import { Controller, Post, Body, BadRequestException, ConflictException, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: { email: string }) {
    const { email } = body;

    // Vérification de la validité de l'email
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
    // Vérification du format de l'email à l'aide d'une expression régulière simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
