import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { UserModule } from '../user/user.module';
import { TaskController } from './task.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Task]), UserModule],
    providers: [TaskService],
    controllers: [TaskController],
    exports: [TaskService],
})
export class TaskModule {}
