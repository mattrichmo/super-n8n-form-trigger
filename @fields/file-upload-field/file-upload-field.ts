import { BaseFieldProps } from '../types';

export interface FileUploadFieldProps extends BaseFieldProps {
  type: 'file-upload';
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  dropzoneText?: string;
  showPreviews?: boolean;
  autoUpload?: boolean;
  validation?: {
    minFiles?: number;
    requiredFileTypes?: string[];
    maxTotalSize?: number;
  };
}

export class FileUploadField {
  static type = 'file-upload';
  
  static getSchema(): FileUploadFieldProps {
    return {
      name: 'fileUploadField',
      type: 'file-upload',
      displayName: 'File Upload',
      description: 'Upload one or more files',
      options: [
        {
          name: 'Multiple Files',
          type: 'boolean',
          default: false
        },
        {
          name: 'Max Files',
          type: 'number',
          default: 10,
          description: 'Maximum number of files allowed'
        },
        {
          name: 'Max Size (MB)',
          type: 'number',
          default: 10,
          description: 'Maximum size per file in MB'
        },
        {
          name: 'Allowed Types',
          type: 'string',
          default: '*',
          description: 'Comma-separated list of allowed file types (e.g., .pdf,.doc)'
        }
      ]
    };
  }
} 