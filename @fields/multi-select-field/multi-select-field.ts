import { BaseFieldProps } from '../types';

export interface MultiSelectFieldProps extends BaseFieldProps {
  type: 'multi-select';
  options: Array<{
    label: string;
    value: string;
    description?: string;
    icon?: string;
  }>;
  maxSelections?: number;
  minSelections?: number;
  searchable?: boolean;
  groupBy?: string;
  chipDisplay?: boolean;
}

export class MultiSelectField {
  static type = 'multi-select';
  
  static getSchema(): MultiSelectFieldProps {
    return {
      name: 'multiSelectField',
      type: 'multi-select',
      displayName: 'Multiple Choice',
      description: 'Select multiple options from a list',
      options: [
        {
          name: 'Max Selections',
          type: 'number',
          default: 0,
          description: '0 for unlimited'
        },
        {
          name: 'Searchable',
          type: 'boolean',
          default: true
        },
        {
          name: 'Display as Chips',
          type: 'boolean',
          default: true
        }
      ]
    };
  }
} 