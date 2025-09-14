"use client";

import { CheckSquare } from 'lucide-react';
import { FormElement, FormElementInstance } from '@/lib/types';
import { TextFieldFormElement } from './TextField'; // Re-using properties component for simplicity

// --- Builder Component ---
const BuilderComponent = ({ elementInstance }: { elementInstance: FormElementInstance }) => (
  <div className="flex items-center gap-2 w-full">
    <input type="checkbox" id={elementInstance.id} readOnly disabled className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
    <label htmlFor={elementInstance.id} className="text-sm text-gray-600">{elementInstance.label} {elementInstance.required && <span className="text-red-500">*</span>}</label>
  </div>
);

// --- Element Configuration ---
export const CheckboxFieldFormElement: FormElement = {
  type: 'Checkbox',
  construct: (id: string) => ({ id, type: 'Checkbox', label: 'Checkbox Field', required: false }),
  buttonComponent: {
    icon: CheckSquare,
    label: 'Checkbox',
  },
  builderComponent: BuilderComponent,
  propertiesComponent: TextFieldFormElement.propertiesComponent, // Re-using for simplicity
};