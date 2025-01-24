import { BaseFieldProps } from './types';
import { ShortTextField } from './short-text-field/short-text-field';
import { RichTextField } from './rich-text-field/rich-text-field';
import { MultiSelectField } from './multi-select-field/multi-select-field';
import { RadioGroupField } from './radio-group-field/radio-group-field';
import { DateField } from './date-field/date-field';
import { FileUploadField } from './file-upload-field/file-upload-field';
import { ImageUploadField } from './image-upload-field/image-upload-field';
import { RatingField } from './rating-field/rating-field';
import { MatrixField } from './matrix-field/matrix-field';
import { RankingField } from './ranking-field/ranking-field';
import { PhoneField } from './phone-field/phone-field';

export const fieldRegistry = {
  'short-text': ShortTextField,
  'rich-text': RichTextField,
  'multi-select': MultiSelectField,
  'radio-group': RadioGroupField,
  'date': DateField,
  'file-upload': FileUploadField,
  'image-upload': ImageUploadField,
  'rating': RatingField,
  'matrix': MatrixField,
  'ranking': RankingField,
  'phone': PhoneField,
};

export type FieldType = keyof typeof fieldRegistry;

export const getFieldOptions = () => {
  return Object.entries(fieldRegistry).map(([value, field]) => ({
    name: field.getSchema().displayName,
    value,
    description: field.getSchema().description
  }));
}; 