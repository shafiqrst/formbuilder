"use client";

import { FolderOpen, List, Trash, Eye, Save } from 'lucide-react';
import { useBuilderStore } from '@/lib/store';

const BuilderToolbar = () => {
  const { setLayout } = useBuilderStore();

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the canvas? This cannot be undone.')) {
      setLayout([]);
    }
  };

  return (
    <div className="bg-white p-3 border rounded-lg mb-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="relative rounded-md shadow-sm w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-tag text-gray-400"></i>
          </div>
          <input type="text" id="formName" className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md" placeholder="Enter form name..." defaultValue="Untitled Form" />
        </div>
        <div className="flex items-center space-x-2">
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <FolderOpen size={16} className="mr-2" /> Load
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <List size={16} className="mr-2" /> List
          </button>
          <button onClick={handleClear} className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600">
            <Trash size={16} className="mr-2" /> Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuilderToolbar;