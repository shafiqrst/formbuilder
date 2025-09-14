import { create } from 'zustand';
import { formElements } from '@/components/form-builder/FormElements';
import { FormElementInstance } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

export type Row = {
  id: string;
  type: 'row';
  columns: Column[];
};

export type Column = {
  id: string;
  type: 'column';
  width: number;
  fields: FormElementInstance[];
};

export type LayoutItem = Row | Column | FormElementInstance;

type BuilderStore = {
  layout: Row[];
  selectedElement: LayoutItem | null;
  addElement: (colId: string, type: keyof typeof formElements) => void;
  addRow: (index: number) => void;
  removeRow: (id: string) => void;
  removeElement: (id: string) => void;
  setSelectedElement: (element: LayoutItem | null) => void;
  updateElement: (id: string, element: LayoutItem) => void;
  setLayout: (layout: Row[]) => void;
  moveElement: (dragId: string, dropId: string) => void;
};

export const useBuilderStore = create<BuilderStore>((set) => ({
  layout: [],
  selectedElement: null,
  addElement: (colId, type) =>
    set((state) => {
      const newLayout = [...state.layout];
      const newElement = formElements[type].construct(uuidv4());
      for (const row of newLayout) {
        const col = row.columns.find((c) => c.id === colId);
        if (col) {
          col.fields.push(newElement);
          break;
        }
      }
      return { layout: newLayout, selectedElement: newElement };
    }),
  addRow: (index: number) => set((state) => {
    const newRow: Row = {
      id: uuidv4(),
      type: 'row',
      columns: [
        { id: uuidv4(), type: 'column', width: 12, fields: [] }
      ]
    };
    const newLayout = [...state.layout];
    newLayout.splice(index, 0, newRow);
    return { layout: newLayout };
  }),
  removeRow: (id: string) => set((state) => ({
    layout: state.layout.filter(row => row.id !== id),
    selectedElement: state.selectedElement?.id === id ? null : state.selectedElement,
  })),
  removeElement: (id) =>
    set((state) => {
      const newLayout = state.layout.map(row => ({
        ...row,
        columns: row.columns.map(col => ({
          ...col,
          fields: col.fields.filter(f => f.id !== id)
        }))
      }));
      return {
        layout: newLayout,
        selectedElement: state.selectedElement?.id === id ? null : state.selectedElement,
      };
    }),
  setSelectedElement: (element) => set({ selectedElement: element }), // This will handle rows, cols, and fields
  updateElement: (id, element) =>
    set((state) => ({
      layout: state.layout.map(row => {
        if (row.id === id) return element as Row;
        return {
          ...row,
          columns: row.columns.map(col => {
            if (col.id === id) return element as Column;
            return {
              ...col,
              fields: col.fields.map(f => f.id === id ? element as FormElementInstance : f)
            };
          })
        };
      }),
    })),
  setLayout: (layout) => set({ layout }),
  moveElement: (dragId, dropId) => {
    // This is a complex operation and would be implemented in onDragEnd
    // For now, we just have a placeholder
    console.log(`Moving ${dragId} to ${dropId}`);
  }
}));