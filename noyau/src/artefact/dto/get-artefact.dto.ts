import { Artefact } from 'src/artefact/artefact.entity';

export class GetArtefactResponseDto {
	artefact: Artefact | null;
	message: string;
}
