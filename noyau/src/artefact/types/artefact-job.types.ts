import { Artefact } from 'src/artefact/artefact.entity';

export interface GeneratePayload {
	artefact: Artefact;
}

export interface JobPayloads {
	generate: GeneratePayload;
}
