import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { ARTEFACT_JOBS, ARTEFACT_QUEUE } from './constants/artefact.queue';
import { GeneratePayload } from './types/artefact-job.types';

@Processor(ARTEFACT_QUEUE)
export class ArtefactProcessor extends WorkerHost {
	async process(job: Job) {
		switch (job.name) {
			case ARTEFACT_JOBS.GENERATE:
				const data = job.data as GeneratePayload;

				console.log('generating artefact for artefact: ' + data.artefact.prompt);
				break;

			default:
				break;
		}
	}
}
