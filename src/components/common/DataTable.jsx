import React from 'react';

const DataTable = ({ data, columns, actions, keyField = 'id' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">No data available</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item[keyField]} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {column.render 
                    ? column.render(item[column.key], item)
                    : item[column.key]
                  }
                </td>
              ))}
              {actions && actions.length > 0 && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    {actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => action.onClick(action.label === 'Delete' ? item[keyField] : item)}
                        className={`p-1 rounded-md hover:bg-gray-100 ${action.className || 'text-gray-600 hover:text-gray-900'}`}
                        title={action.label}
                      >
                        <action.icon className="h-4 w-4" />
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;