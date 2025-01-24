import { BaseFieldProps } from '../types';

export interface RadioGroupFieldProps extends BaseFieldProps {
  type: 'radio-group';
  options: Array<{
    label: string;
    value: string;
    description?: string;
    disabled?: boolean;
  }>;
  layout?: 'horizontal' | 'vertical' | 'grid';
  cardStyle?: boolean;
}

export class RadioGroupField {
  static type = 'radio-group';
  
  static getSchema(): RadioGroupFieldProps {
    return {
      name: 'radioGroupField',
      type: 'radio-group',
      displayName: 'Single Choice',
      description: 'Select one option from a list',
      options: [
        {
          name: 'Layout',
          type: 'options',
          options: [
            { name: 'Horizontal', value: 'horizontal' },
            { name: 'Vertical', value: 'vertical' },
            { name: 'Grid', value: 'grid' }
          ],
          default: 'vertical'
        },
        {
          name: 'Card Style',
          type: 'boolean',
          default: false,
          description: 'Display options as cards with more details'
        }
      ]
    };
  }
} 