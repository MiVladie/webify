import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { CreateArtefactDto, CreateArtefactResponseDto } from './dto/create-artefact.dto';
import { GetArtefactResponseDto } from './dto/get-artefact.dto';

@Controller('artefacts')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get(':id')
	async get(@Param('id') id: string): Promise<GetArtefactResponseDto> {
		const artefact = await this.appService.findOne(id);

		if (!artefact) {
			throw new NotFoundException();
		}

		return { artefact, message: 'Artefact generation is complete!' };
	}

	@Post()
	async create(@Body() body: CreateArtefactDto): Promise<CreateArtefactResponseDto> {
		const artefact = await this.appService.create(body.prompt);

		if (!artefact) {
			throw new Error();
		}

		return { artefact, message: 'Artefact generation started!' };
	}
}
