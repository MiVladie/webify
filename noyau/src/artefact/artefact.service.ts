import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Artefact } from './artefact.entity';
import { ArtefactQueue } from './artefact.queue';

@Injectable()
export class ArtefactService {
	constructor(
		@InjectRepository(Artefact) private repository: Repository<Artefact>,
		private queue: ArtefactQueue
	) {}

	findOne(id: string): Promise<Artefact | null> {
		return this.repository.findOneBy({ id });
	}

	async findOneOrFail(id: string): Promise<Artefact> {
		const artefact = await this.findOne(id);

		if (!artefact) {
			throw new NotFoundException(`Artefact with id '${id}' not found`);
		}

		return artefact;
	}

	async create(prompt: string): Promise<Artefact> {
		const data = this.repository.create({ prompt });
		const artefact = await this.repository.save(data);

		this.queue.generate({ artefact });

		return artefact;
	}
}
