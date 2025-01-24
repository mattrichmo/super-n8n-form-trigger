import { BaseFieldProps } from '../types';

export interface RichTextFieldProps extends BaseFieldProps {
  type: 'rich-text';
  toolbar?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    bulletList?: boolean;
    numberedList?: boolean;
    link?: boolean;
  };
  minLength?: number;
  maxLength?: number;
  height?: number;
}

export class RichTextField {
  static type = 'rich-text';
  
  static getSchema(): RichTextFieldProps {
    return {
      name: 'richTextField',
      type: 'rich-text',
      displayName: 'Rich Text Editor',
      description: 'Text editor with formatting options',
      options: [
        {
          name: 'Toolbar Options',
          type: 'collection',
          default: {
            bold: true,
            italic: true,
            underline: true,
            bulletList: true,
            numberedList: true,
            link: true
          }
        },
        {
          name: 'Height',
          type: 'number',
          default: 200,
        }
      ]
    };
  }
} 