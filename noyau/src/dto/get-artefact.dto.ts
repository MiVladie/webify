import { Artefact } from 'src/entities/artefact.entity';

export class GetArtefactResponseDto {
	artefact: Artefact | null;
	message: string;
}
