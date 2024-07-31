import { Module } from '@nestjs/common';
import { PreferenceService } from './services/preference.service';
import { PreferenceController } from './controllers/preference.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PreferenceSchema } from './schemas/preference.schema';

@Module({
  imports: [
    MongooseModule.forFeature([      
      { name: 'Preference', schema: PreferenceSchema },
    ]),
  ],
  providers: [PreferenceService],
  controllers: [PreferenceController]
})
export class PreferenceModule {}



