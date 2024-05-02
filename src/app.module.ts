import { PrismaModule } from '../prisma/prisma.module';
import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [AppRoutingModule, ConfigurationModule, PrismaModule],
})
export class AppModule {}