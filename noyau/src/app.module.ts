import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';

import { BullMqConfigService } from './config/bull.config';
import { TypeOrmConfigService } from './config/database.config';
import { ArtefactModule } from './artefact/artefact.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		BullModule.forRootAsync({
			imports: [ConfigModule],
			useClass: BullMqConfigService
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useClass: TypeOrmConfigService
		}),
		ArtefactModule
	]
})
export class AppModule {}
