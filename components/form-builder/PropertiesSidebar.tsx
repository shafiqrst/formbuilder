"use client";

import { useBuilderStore, LayoutItem } from '@/lib/store';
import { formElements } from './FormElements';
import { FormElementInstance } from '@/lib/types';
import { X } from 'lucide-react';
import FormStats from './FormStats';

const PropertiesSidebar = () => {
  const { selectedElement, setSelectedElement } = useBuilderStore();
  if (!selectedElement) {
    return (
      <div>
        <h5 className="mb-3">Settings</h5>
        <div className="small text-muted">Select an item on the canvas to edit its settings.</div>
      </div>
    );
  }

  const PropertiesComponent = () => {
    if (selectedElement.type === 'row') {
      return <div>Row Properties (ID: {selectedElement.id})</div>;
    }
    if (selectedElement.type === 'column') {
      return <div>Column Properties (ID: {selectedElement.id})</div>;
    }
    if (selectedElement.type in formElements) {
      const Comp = formElements[selectedElement.type as keyof typeof formElements]?.propertiesComponent;
      if (Comp) {
        return <Comp elementInstance={selectedElement as FormElementInstance} />;
      }
    }
    return null;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="text-lg font-semibold capitalize mb-0">{selectedElement.type} Properties</p>
        <button onClick={() => setSelectedElement(null)} className="btn-close"></button>
      </div>
      <div className="border-t pt-4">
        <PropertiesComponent />
      </div>
    </div>
  );
};

export default PropertiesSidebar;