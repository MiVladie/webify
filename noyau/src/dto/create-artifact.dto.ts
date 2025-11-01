import { IsNotEmpty, IsString } from 'class-validator';
import { ArtifactStatus } from './artifact-status.enum';

export class CreateArtifactDto {
	@IsString()
	@IsNotEmpty()
	prompt: string;
}

export class CreateArtifactResponseDto {
	status: ArtifactStatus;
	message: string;
}
