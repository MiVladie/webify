import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artefact } from './entities/artefact.entity';

@Injectable()
export class AppService {
	constructor(
		@InjectRepository(Artefact)
		private artefactsRepository: Repository<Artefact>
	) {}

	findOne(id: string): Promise<Artefact | null> {
		return this.artefactsRepository.findOneBy({ id });
	}

	create(prompt: string): Promise<Artefact | null> {
		const artefact = this.artefactsRepository.create({ prompt });

		return this.artefactsRepository.save(artefact);
	}

	analyzePrompt(prompt: string) {
		const data: string = '';

		return data;
	}

	generateStructure(prompt: string) {
		const structure: string = '';

		return structure;
	}

	generateWebsite(structure: string) {
		const data: string = '';

		return data;
	}
}
