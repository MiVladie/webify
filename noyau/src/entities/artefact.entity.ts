import { ArtefactStatus } from 'src/dto/artefact-status.enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artefacts')
export class Artefact {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'enum', enum: ArtefactStatus, default: ArtefactStatus.GENERATING_PROMPT })
	status: ArtefactStatus;

	@Column()
	prompt: string;

	@CreateDateColumn()
	createdAt: Date;
}
