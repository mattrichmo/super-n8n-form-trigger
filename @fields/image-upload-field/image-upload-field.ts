import { BaseFieldProps } from '../types';

export interface ImageUploadFieldProps extends BaseFieldProps {
  type: 'image-upload';
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  allowedTypes?: string[];
  aspectRatio?: number;
  resizeOptions?: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
  };
  cropEnabled?: boolean;
  previewOptions?: {
    width: number;
    height: number;
    fit: 'cover' | 'contain';
  };
}

export class ImageUploadField {
  static type = 'image-upload';
  
  static getSchema(): ImageUploadFieldProps {
    return {
      name: 'imageUploadField',
      type: 'image-upload',
      displayName: 'Image Upload',
      description: 'Upload and preview images with optional cropping',
      options: [
        {
          name: 'Multiple Images',
          type: 'boolean',
          default: false
        },
        {
          name: 'Enable Cropping',
          type: 'boolean',
          default: true
        },
        {
          name: 'Aspect Ratio',
          type: 'number',
          default: 1,
          description: 'Aspect ratio for image cropping (width/height)'
        },
        {
          name: 'Max Size (MB)',
          type: 'number',
          default: 5
        }
      ]
    };
  }
} 