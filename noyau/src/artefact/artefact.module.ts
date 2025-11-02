import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Artefact } from './artefact.entity';
import { ArtefactController } from './artefact.controller';
import { ArtefactService } from './artefact.service';
import { ArtefactProcessor } from './artefact.processor';
import { ARTEFACT_QUEUE } from './constants/artefact.queue';
import { ArtefactQueue } from './artefact.queue';

@Module({
	imports: [BullModule.registerQueue({ name: ARTEFACT_QUEUE }), TypeOrmModule.forFeature([Artefact])],
	controllers: [ArtefactController],
	providers: [ArtefactService, ArtefactQueue, ArtefactProcessor]
})
export class ArtefactModule {}
