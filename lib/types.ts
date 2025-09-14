import React from 'react';

export type FormElementInstance = {
  id: string;
  type: 'TextField' | 'Textarea' | 'Checkbox';
  label: string;
  required: boolean;
};

export type FormElement = {
  type: FormElementInstance['type'];
  construct: (id: string) => FormElementInstance;
  buttonComponent: {
    icon: React.ElementType;
    label: string;
  };
  builderComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
};