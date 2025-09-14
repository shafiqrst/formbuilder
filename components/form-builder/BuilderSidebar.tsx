"use client";

import { Droppable, Draggable } from '@hello-pangea/dnd';
import { formElements, FormElementInstance } from '@/components/form-builder/FormElements';
import { useBuilderStore } from '@/lib/store';
import { Plus, Settings, LayoutPanelLeft } from 'lucide-react';
import { useState } from 'react';
import PropertiesSidebar from './PropertiesSidebar';
import FormStats from './FormStats';

const SidebarElement = ({ formElement }: { formElement: (typeof formElements)[string] }) => {
  const { label, icon: Icon } = formElement.buttonComponent;
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2 border rounded-md bg-white hover:bg-gray-100 cursor-grab h-[90px]">
      <Icon className="h-8 w-8 text-primary" />
      <p className="text-xs text-center">{label}</p>
    </div>
  );
};

const BuilderSidebar = () => {
  const { layout, addRow, addElement } = useBuilderStore();
  const [activeTab, setActiveTab] = useState('elements');

  const addField = (type) => {
    const lastRow = layout[layout.length - 1];
    if (lastRow) {
      const lastCol = lastRow.columns[lastRow.columns.length - 1];
      addElement(lastCol.id, type);
    } else {
      addRow(0);
      // This is async, so we can't reliably add an element right away.
      // A better implementation would handle this in the store.
    }
  };

  return (
    <div className="lg:col-span-4 order-last lg:order-first">
      <div className="bg-white border rounded-lg p-4 shadow-sm h-full">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('elements')}
              className={`${activeTab === 'elements' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm inline-flex items-center w-1/2 justify-center`}
            >
              <LayoutPanelLeft size={16} className="mr-2" /> Elements
            </button>
            <button
              onClick={() => setActiveTab('properties')}
              className={`${activeTab === 'properties' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm inline-flex items-center w-1/2 justify-center`}
            >
              <Settings size={16} className="mr-2" /> Properties
            </button>
          </nav>
        </div>

        <div className="pt-4 h-[calc(100%-100px)] overflow-y-auto">
          {activeTab === 'elements' && (
            <>
              <button onClick={() => addRow(layout.length)} className="w-full flex items-center justify-center gap-2 text-sm border-2 border-dashed border-gray-300 hover:border-blue-500 hover:text-blue-500 p-2 rounded-md mb-4">
                <Plus size={16} /> Add Row
              </button>
              <h3 className="text-md font-medium text-gray-900 mb-3">Fields</h3>
            <Droppable droppableId="form-elements-sidebar" isDropDisabled={true}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-2 gap-2">
                  {Object.values(formElements).map((element, index) => (
                    <div key={element.type} onClick={() => addField(element.type)}>
                      <Draggable draggableId={element.type} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <SidebarElement formElement={element} />
                          </div>
                        )}
                      </Draggable>
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
              <p className="mt-4 text-xs text-gray-500">Tip: Click a field to add it to the last row, or drag it into the canvas.</p>
            </>
          )}

          {activeTab === 'properties' && <PropertiesSidebar />}
        </div>
      </div>
      <FormStats />
    </div>
  );
};

export default BuilderSidebar;