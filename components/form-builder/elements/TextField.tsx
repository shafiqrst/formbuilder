"use client";

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Type } from 'lucide-react';
import { FormElement, FormElementInstance } from '@/lib/types';
import { useBuilderStore } from '@/lib/store';

// --- Builder Component ---
const BuilderComponent = ({ elementInstance }: { elementInstance: FormElementInstance }) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-sm text-gray-600">{elementInstance.label} {elementInstance.required && <span className="text-red-500">*</span>}</label>
    <input type="text" readOnly disabled className="w-full rounded-md border-gray-300 bg-gray-100 p-2" placeholder="Text field" />
  </div>
);

// --- Properties Component ---
const PropertiesComponent = ({ elementInstance }: { elementInstance: FormElementInstance }) => {
  const { updateElement } = useBuilderStore();
  const { register, watch, reset } = useForm({ defaultValues: { label: elementInstance.label, required: elementInstance.required } });

  useEffect(() => {
    reset(elementInstance);
  }, [elementInstance, reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      updateElement(elementInstance.id, { ...elementInstance, ...value });
    });
    return () => subscription.unsubscribe();
  }, [watch, elementInstance, updateElement]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
        <input {...register("label")} className="w-full rounded-md border-gray-300 shadow-sm p-2" />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("required")} id="required-checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
        <label htmlFor="required-checkbox" className="text-sm text-gray-700">Required</label>
      </div>
    </form>
  );
};

// --- Element Configuration ---
export const TextFieldFormElement: FormElement = {
  type: 'TextField',
  construct: (id: string) => ({ id, type: 'TextField', label: 'Text Field', required: false }),
  buttonComponent: { icon: Type, label: 'Text Field' },
  builderComponent: BuilderComponent,
  propertiesComponent: PropertiesComponent,
};