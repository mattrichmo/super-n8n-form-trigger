import { BaseFieldProps } from '../types';

export interface SelectFieldProps extends BaseFieldProps {
  type: 'select';
  multiple?: boolean;
  options: Array<{
    label: string;
    value: string | number;
  }>;
}

export class SelectField {
  static type = 'select';

  static getSchema(): SelectFieldProps {
    return {
      name: 'selectField',
      type: 'select',
      displayName: 'Select Field',
      description: 'Dropdown selection field',
      options: [
        {
          name: 'Multiple',
          type: 'boolean',
          default: false,
        },
        {
          name: 'Options',
          type: 'fixedCollection',
          typeOptions: {
            multipleValues: true,
          },
          default: {},
          options: [
            {
              name: 'option',
              displayName: 'Option',
              values: [
                {
                  displayName: 'Label',
                  name: 'label',
                  type: 'string',
                  default: '',
                },
                {
                  displayName: 'Value',
                  name: 'value',
                  type: 'string',
                  default: '',
                }
              ]
            }
          ]
        }
      ]
    };
  }
} 