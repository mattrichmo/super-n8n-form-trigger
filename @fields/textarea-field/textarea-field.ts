import { BaseFieldProps } from '../types';

export interface TextareaFieldProps extends BaseFieldProps {
  type: 'textarea';
  rows?: number;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
}

export class TextareaField {
  static type = 'textarea';

  static getSchema(): TextareaFieldProps {
    return {
      name: 'textareaField',
      type: 'textarea', 
      displayName: 'Textarea Field',
      default: '',
      description: 'Multi-line text input',
      options: [
        {
          name: 'Rows',
          type: 'number',
          default: 3,
        },
        {
          name: 'Placeholder',
          type: 'string',
          default: '',
        },
        {
          name: 'Min Length',
          type: 'number',
          default: 0,
        },
        {
          name: 'Max Length',
          type: 'number',
          default: 524288,
        }
      ]
    };
  }
} 