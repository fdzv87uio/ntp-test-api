import { Module } from '@nestjs/common';
import { PreferenceService } from './services/preference.service';
import { PreferenceController } from './controllers/preference.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PreferenceSchema } from './schemas/preference.schema';
import { PreferenceExtraSchema } from './schemas/preferenceExtra.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Preference', schema: PreferenceSchema },
      { name: 'PreferenceExtra', schema: PreferenceExtraSchema },
    ]),
  ],
  providers: [PreferenceService],
  controllers: [PreferenceController]
})
export class PreferenceModule {}



