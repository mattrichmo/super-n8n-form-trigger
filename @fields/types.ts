export interface BaseFieldProps {
  name: string;
  displayName: string;
  type: string;
  description?: string;
  required?: boolean;
  default?: any;
  disabled?: boolean;
  hidden?: boolean;
  options?: any[];
}

export interface FieldValidation {
  required?: boolean;
  pattern?: string;
  custom?: (value: any) => boolean | string;
}

export interface FieldOption {
  name: string;
  value: string | number;
  description?: string;
} 