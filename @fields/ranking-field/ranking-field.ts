import { BaseFieldProps } from '../types';

export interface RankingFieldProps extends BaseFieldProps {
  type: 'ranking';
  items: Array<{
    id: string;
    label: string;
    description?: string;
    icon?: string;
  }>;
  displayMode: 'list' | 'grid' | 'horizontal';
  showRankNumbers?: boolean;
  allowTies?: boolean;
  dragHandle?: 'item' | 'handle';
  animation?: {
    duration: number;
    easing: string;
  };
}

export class RankingField {
  static type = 'ranking';
  
  static getSchema(): RankingFieldProps {
    return {
      name: 'rankingField',
      type: 'ranking',
      displayName: 'Ranking',
      description: 'Drag and drop items to rank them in order',
      options: [
        {
          name: 'Display Mode',
          type: 'options',
          options: [
            { name: 'Vertical List', value: 'list' },
            { name: 'Grid', value: 'grid' },
            { name: 'Horizontal', value: 'horizontal' }
          ],
          default: 'list'
        },
        {
          name: 'Show Rank Numbers',
          type: 'boolean',
          default: true
        },
        {
          name: 'Allow Ties',
          type: 'boolean',
          default: false
        }
      ]
    };
  }
} 