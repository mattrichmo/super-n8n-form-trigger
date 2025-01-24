import { BaseFieldProps } from '../types';

export interface ShortTextFieldProps extends BaseFieldProps {
  type: 'short-text';
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  autocomplete?: string;
  pattern?: string;
}

export class ShortTextField {
  static type = 'short-text';
  
  static getSchema(): ShortTextFieldProps {
    return {
      name: 'shortTextField',
      type: 'short-text',
      displayName: 'Short Text',
      description: 'Single line text input for short responses',
      options: [
        {
          name: 'Placeholder',
          type: 'string',
          default: '',
        },
        {
          name: 'Prefix',
          type: 'string',
          description: 'Text to show before the input',
          default: '',
        },
        {
          name: 'Suffix', 
          type: 'string',
          description: 'Text to show after the input',
          default: '',
        },
        {
          name: 'Pattern',
          type: 'string',
          description: 'Regex pattern for validation',
          default: '',
        }
      ]
    };
  }
} 