"use client";

import { DragDropContext } from '@hello-pangea/dnd';
import { onDragEnd } from '@/dnd';
import BuilderHeader from '@/components/form-builder/BuilderHeader';
import { DndProvider } from '@/components/dnd-provider';
import BuilderSidebar from '@/components/form-builder/BuilderSidebar';
import BuilderCanvas from '@/components/form-builder/BuilderCanvas';
import PropertiesSidebar from '@/components/form-builder/PropertiesSidebar';
import BuilderToolbar from '@/components/form-builder/BuilderToolbar';

const BuilderPage = () => {
  return (
    <DndProvider>
      <div className="flex flex-col h-screen bg-gray-100">
        <BuilderHeader />
        <main className="flex-grow container mx-auto py-4">
          <BuilderToolbar />
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
              <BuilderSidebar />
              <BuilderCanvas />
              <PropertiesSidebar />
            </div>
          </DragDropContext>
          </main>
      </div>
    </DndProvider>
  );
};

export default BuilderPage;