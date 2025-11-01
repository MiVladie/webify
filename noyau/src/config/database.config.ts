import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
	constructor(private configService: ConfigService) {}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'mysql',
			database: this.configService.get<string>('DB_NAME'),
			username: this.configService.get<string>('DB_USERNAME'),
			password: this.configService.get<string>('DB_PASSWORD'),
			host: this.configService.get<string>('DB_HOST'),
			port: +this.configService.get<number>('DB_PORT')!,
			autoLoadEntities: true,
			synchronize: this.configService.get<string>('NODE_ENV') !== 'production'
		};
	}
}
