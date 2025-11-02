import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { ArtefactService } from '../artefact.service';
import { Artefact } from 'src/artefact/artefact.entity';

@Injectable()
export class ArtefactByIdPipe implements PipeTransform<string, Promise<Artefact>> {
	constructor(private readonly appService: ArtefactService) {}

	transform(value: string): Promise<Artefact> {
		if (!isUUID(value)) {
			throw new BadRequestException(`Invalid artefact id format: '${value}'`);
		}

		return this.appService.findOneOrFail(value);
	}
}
