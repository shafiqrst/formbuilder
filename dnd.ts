import { DropResult } from '@hello-pangea/dnd';
import { formElements } from '@/components/form-builder/FormElements';
import { useBuilderStore, Row, Column } from '@/lib/store';

export const onDragEnd = (
  result: DropResult,
) => {
  const { source, destination } = result;
  const { layout, addElement, setLayout, moveElement } = useBuilderStore.getState();

  // 1. Dropped outside a valid droppable area
  if (!destination) return;

  // Case 1: Dropping a new element from the sidebar
  if (source.droppableId === 'form-elements-sidebar' && destination.droppableId.startsWith('col-')) {
    const colId = destination.droppableId.replace('col-', '');
    const type = result.draggableId as keyof typeof formElements;
    addElement(colId, type);
    return;
  }

  const newLayout = layout.map(row => ({
    ...row,
    columns: row.columns.map(col => ({ ...col, fields: [...col.fields] }))
  }));

  // 3. Re-ordering rows
  if (result.type === 'ROW') {
    const [removed] = newLayout.splice(source.index, 1);
    newLayout.splice(destination.index, 0, removed);
    setLayout(newLayout);
    return;
  }

  // 4. Re-ordering fields within or between columns
  if (result.type === 'FIELD') {
    const sourceColId = source.droppableId.replace('col-', '');
    const destColId = destination.droppableId.replace('col-', '');

    const sourceCol = newLayout.flatMap(row => row.columns).find(c => c.id === sourceColId);
    const destCol = newLayout.flatMap(row => row.columns).find(c => c.id === destColId);

    if (!sourceCol || !destCol) return;

    const [draggedItem] = sourceCol.fields.splice(source.index, 1);
    destCol.fields.splice(destination.index, 0, draggedItem);

    setLayout(newLayout);
  }
};