import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BullRootModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bullmq';

@Injectable()
export class BullMqConfigService implements SharedBullConfigurationFactory {
	constructor(private configService: ConfigService) {}

	createSharedConfiguration(): Promise<BullRootModuleOptions> | BullRootModuleOptions {
		return {
			connection: {
				host: this.configService.get<string>('REDIS_HOST'),
				port: +this.configService.get<number>('REDIS_PORT')!
			}
		};
	}
}
