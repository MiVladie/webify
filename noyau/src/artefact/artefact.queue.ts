import { Queue } from 'bullmq';
import { GeneratePayload } from './types/artefact-job.types';
import { ARTEFACT_JOBS, ARTEFACT_QUEUE } from './constants/artefact.queue';
import { InjectQueue } from '@nestjs/bullmq';

export class ArtefactQueue {
	constructor(@InjectQueue(ARTEFACT_QUEUE) private queue: Queue) {}

	generate(data: GeneratePayload) {
		this.queue.add(ARTEFACT_JOBS.GENERATE, data);
	}
}
