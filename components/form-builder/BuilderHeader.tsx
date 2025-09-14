"use client";

import { Save, Eye, Share2, Radio, PenSquare, FolderOpen, List, Trash, Code } from 'lucide-react';

const BuilderHeader = () => {
  return (
    <header className="bg-white shadow-sm px-4 py-3 border-b">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold flex items-center text-gray-800">
            <PenSquare className="h-6 w-6 mr-2 text-blue-600" />
            <span>Drag & Drop Builder</span>
          </h1>
        </div>
        <div>
          <span className="mr-4 text-sm text-gray-600">
            Status: <span className="ml-1 px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800" id="formStatusBadge">Draft</span>
          </span>
          <button id="btnSave" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Save size={16} className="mr-2" />Save Draft
          </button>
        </div>
      </div>
    </header>
  );
};

export default BuilderHeader;