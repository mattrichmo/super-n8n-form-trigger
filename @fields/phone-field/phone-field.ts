import { BaseFieldProps } from '../types';

export interface PhoneFieldProps extends BaseFieldProps {
  type: 'phone';
  defaultCountry?: string;
  allowedCountries?: string[];
  format?: 'national' | 'international';
  showCountrySelect?: boolean;
}

export class PhoneField {
  static type = 'phone';
  
  static getSchema(): PhoneFieldProps {
    return {
      name: 'phoneField',
      type: 'phone',
      displayName: 'Phone Number',
      description: 'International phone number input',
      options: [
        {
          name: 'Default Country',
          type: 'string',
          default: 'US'
        },
        {
          name: 'Format',
          type: 'options',
          options: [
            { name: 'National', value: 'national' },
            { name: 'International', value: 'international' }
          ],
          default: 'national'
        }
      ]
    };
  }
} 