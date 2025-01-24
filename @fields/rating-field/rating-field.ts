import { BaseFieldProps } from '../types';

export interface RatingFieldProps extends BaseFieldProps {
  type: 'rating';
  maxRating?: number;
  allowHalf?: boolean;
  showLabels?: boolean;
  labels?: {
    low?: string;
    medium?: string;
    high?: string;
  };
  icon?: 'star' | 'heart' | 'thumb' | 'custom';
  customIcon?: string;
  size?: 'sm' | 'md' | 'lg';
  colors?: {
    filled: string;
    unfilled: string;
    hover: string;
  };
}

export class RatingField {
  static type = 'rating';
  
  static getSchema(): RatingFieldProps {
    return {
      name: 'ratingField',
      type: 'rating',
      displayName: 'Rating',
      description: 'Star rating input with customizable options',
      options: [
        {
          name: 'Max Rating',
          type: 'number',
          default: 5
        },
        {
          name: 'Allow Half Stars',
          type: 'boolean',
          default: false
        },
        {
          name: 'Icon Type',
          type: 'options',
          options: [
            { name: 'Star', value: 'star' },
            { name: 'Heart', value: 'heart' },
            { name: 'Thumb', value: 'thumb' }
          ],
          default: 'star'
        },
        {
          name: 'Size',
          type: 'options',
          options: [
            { name: 'Small', value: 'sm' },
            { name: 'Medium', value: 'md' },
            { name: 'Large', value: 'lg' }
          ],
          default: 'md'
        }
      ]
    };
  }
} 