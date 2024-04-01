import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: parseInt(process.env.DATABASE_PORT),
            database: process.env.DATABASE_NAME,
            entities: [],
            synchronize: true,
        }),
    ],
})
export class DatabaseModule {}
