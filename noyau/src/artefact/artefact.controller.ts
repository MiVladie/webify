import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ArtefactService } from './artefact.service';
import { CreateArtefactDto, CreateArtefactResponseDto } from './dto/create-artefact.dto';
import { GetArtefactResponseDto } from './dto/get-artefact.dto';
import { ArtefactByIdPipe } from './pipes/get-artefact-by-id.pipe';
import { Artefact } from './artefact.entity';

@Controller('artefacts')
export class ArtefactController {
	constructor(private readonly artefactService: ArtefactService) {}

	@Get(':id')
	get(@Param('id', ArtefactByIdPipe) artefact: Artefact): GetArtefactResponseDto {
		return { artefact, message: 'Artefact generation is complete!' };
	}

	@Post()
	async create(@Body() body: CreateArtefactDto): Promise<CreateArtefactResponseDto> {
		const artefact = await this.artefactService.create(body.prompt);

		return { artefact, message: 'Artefact generation started!' };
	}
}
