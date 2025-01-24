import { BaseFieldProps } from '../types';

export interface TextFieldProps extends BaseFieldProps {
  type: 'text';
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
}

export class TextField {
  static type = 'text';
  
  static getSchema(): TextFieldProps {
    return {
      name: 'textField',
      type: 'text',
      displayName: 'Text Field',
      default: '',
      description: 'Single line text input',
      options: [
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