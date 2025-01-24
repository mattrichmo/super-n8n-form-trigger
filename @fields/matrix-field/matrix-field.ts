import { BaseFieldProps } from '../types';

export interface MatrixFieldProps extends BaseFieldProps {
  type: 'matrix';
  rows: Array<{
    id: string;
    label: string;
  }>;
  columns: Array<{
    id: string;
    label: string;
  }>;
  cellType: 'radio' | 'checkbox' | 'rating' | 'text';
  cellOptions?: {
    maxRating?: number;
    maxLength?: number;
  };
  requireAllRows?: boolean;
  showRowNumbers?: boolean;
  layout?: {
    headerAlignment?: 'left' | 'center';
    cellAlignment?: 'left' | 'center';
    striped?: boolean;
    bordered?: boolean;
  };
}

export class MatrixField {
  static type = 'matrix';
  
  static getSchema(): MatrixFieldProps {
    return {
      name: 'matrixField',
      type: 'matrix',
      displayName: 'Matrix Grid',
      description: 'Grid of questions with consistent answer choices',
      options: [
        {
          name: 'Cell Type',
          type: 'options',
          options: [
            { name: 'Single Choice', value: 'radio' },
            { name: 'Multiple Choice', value: 'checkbox' },
            { name: 'Rating', value: 'rating' },
            { name: 'Text', value: 'text' }
          ],
          default: 'radio'
        },
        {
          name: 'Require All Rows',
          type: 'boolean',
          default: true
        },
        {
          name: 'Show Row Numbers',
          type: 'boolean',
          default: false
        }
      ]
    };
  }
} 