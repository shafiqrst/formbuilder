import { Droppable, Draggable } from '@hello-pangea/dnd';
import { formElements } from './FormElements';
import { FormElementInstance } from '@/lib/types';
import { memo } from 'react';
import { useBuilderStore } from '@/lib/store';
import { X } from 'lucide-react';

const BuilderElement = memo(({ element }: { element: FormElementInstance }) => {
  const { removeElement, setSelectedElement, selectedElement } = useBuilderStore();
  const BuilderComponent = formElements[element.type].builderComponent;

  const isSelected = selectedElement?.id === element.id;

  return (
    <div onClick={() => setSelectedElement(element)} 
         className={`relative p-4 border rounded-md bg-white hover:border-blue-500 cursor-pointer group ${isSelected ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300'}`}>
       <button 
        onClick={(e) => { e.stopPropagation(); removeElement(element.id); }}
        className="absolute top-2 right-2 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X size={16} />
      </button>
      <BuilderComponent elementInstance={element} />
    </div>
  );
});

const BuilderCanvas = () => {
  const { layout, addRow, setSelectedElement, selectedElement, removeRow } = useBuilderStore();
  
  return (
    <div className="lg:col-span-8 bg-white border rounded-lg p-4 shadow-sm h-full">
      <Droppable droppableId="builder-canvas" type="ROW">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            id="canvas"
            className={`p-4 bg-gray-50 border-2 border-dashed rounded-md min-h-[600px] transition-colors ${snapshot.isDraggingOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}
          >
            {layout.length > 0 ? (
              <div className="space-y-4">
                {layout.map((row, index) => (
                  <Draggable key={row.id} draggableId={row.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => setSelectedElement(row)}
                        className={`row-wrap relative p-4 border rounded-md group bg-white shadow-sm cursor-grab ${selectedElement?.id === row.id ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200 hover:border-blue-400'}`}
                      >
                        <button
                          onClick={(e) => { e.stopPropagation(); removeRow(row.id); }}
                          className="absolute -top-3 -right-3 h-7 w-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                        <div className="flex gap-4 w-full items-start">
                          {row.columns.map((col) => (
                            <Droppable key={col.id} droppableId={`col-${col.id}`} type="FIELD">
                              {(provided, snapshot) => (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  className={`w-full col-wrap p-2 border-2 border-dashed rounded-md min-h-[100px] transition-colors ${snapshot.isDraggingOver ? 'border-blue-400 bg-blue-100' : 'border-gray-300'}`}
                                >
                                  {col.fields.length > 0 ? (
                                    col.fields.map((element, index) => (
                                      <Draggable key={element.id} draggableId={element.id} index={index}>
                                        {(provided) => (
                                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-4">
                                            <BuilderElement element={element} />
                                          </div>
                                        )}
                                      </Draggable>
                                    ))
                                  ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                      Drop here
                                    </div>
                                  )}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          ))}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center">
                <i className="fas fa-pencil-alt text-5xl mb-4 text-gray-300"></i>
                <h3 className="text-xl font-medium text-gray-500">Let's build a form!</h3>
                <p className="text-sm">Drag fields from the right panel to begin.</p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default BuilderCanvas;