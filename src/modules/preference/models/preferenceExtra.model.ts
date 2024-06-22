import { model } from 'mongoose';
import { PreferenceExtraSchema } from '../schemas/preferenceExtra.schema';

export const preferenceExtraModel = model('PreferenceExtra', PreferenceExtraSchema);