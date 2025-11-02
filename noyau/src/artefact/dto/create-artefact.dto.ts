import { IsNotEmpty, IsString } from 'class-validator';
import { Artefact } from 'src/artefact/artefact.entity';

export class CreateArtefactDto {
	@IsString()
	@IsNotEmpty()
	prompt: string;
}

export class CreateArtefactResponseDto {
	artefact: Artefact;
	message: string;
}
