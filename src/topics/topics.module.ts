import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';

@Module({
    imports: [ConfigModule],
    controllers: [TopicsController],
    providers: [TopicsService],
})
export class TopicsModule {}
