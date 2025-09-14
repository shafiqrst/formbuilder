"use client";

import { useBuilderStore } from "@/lib/store";
import { formElements } from "./FormElements";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

function PropertiesSidebar() {
  const { selectedElement, setSelectedElement } = useBuilderStore();

  if (!selectedElement) {
    return (
      <aside className="lg:col-span-3 flex flex-col items-center justify-center h-full bg-white border rounded-lg p-4 shadow-sm">
        <p className="text-sm text-gray-500 text-center">Click on an element to view its properties.</p>
      </aside>
    );
  }

  const PropertiesForm = formElements[selectedElement.type].propertiesComponent;

  return (
    <aside className="lg:col-span-3 flex flex-col bg-white border rounded-lg p-4 shadow-sm h-full overflow-y-auto">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">Element properties</p>
        <Button size="icon" variant="ghost" onClick={() => setSelectedElement(null)}>
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className="my-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </aside>
  );
}

export default PropertiesSidebar;