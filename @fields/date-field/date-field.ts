import { BaseFieldProps } from '../types';

export interface DateFieldProps extends BaseFieldProps {
  type: 'date';
  includeTime?: boolean;
  minDate?: string;
  maxDate?: string;
  format?: string;
}

export class DateField {
  static type = 'date';

  static getSchema(): DateFieldProps {
    return {
      name: 'dateField',
      type: 'date',
      displayName: 'Date Field',
      description: 'Date/time input field',
      options: [
        {
          name: 'Include Time',
          type: 'boolean',
          default: false,
        },
        {
          name: 'Min Date',
          type: 'string',
          default: '',
        },
        {
          name: 'Max Date',
          type: 'string',
          default: '',
        },
        {
          name: 'Format',
          type: 'string',
          default: 'YYYY-MM-DD',
        }
      ]
    };
  }
} 