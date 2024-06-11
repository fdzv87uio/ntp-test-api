import { model } from 'mongoose';
import { PreferenceSchema } from '../schemas/preference.schema';

export const preferenceModel = model('Preference', PreferenceSchema);