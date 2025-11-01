import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { CreateArtifactDto, CreateArtifactResponseDto } from './dto/create-artifact.dto';
import { ArtifactStatus } from './dto/artifact-status.enum';

@Controller('artifacts')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get(':id')
	get(@Param('id', ParseIntPipe) id: number) {
		console.log({ id });

		return { status: ArtifactStatus.FINISHED, html: '', message: 'Artifact generation is complete!' };
	}

	@Get(':id/status')
	getStatus(@Param('id', ParseIntPipe) id: number) {
		console.log({ id });

		return { status: ArtifactStatus.GENERATING_PROMPT, message: 'Artifact is being created!' };
	}

	@Post()
	create(@Body() body: CreateArtifactDto): CreateArtifactResponseDto {
		console.log(body);

		return { status: ArtifactStatus.GENERATING_PROMPT, message: 'Artifact generation started!' };
	}
}
