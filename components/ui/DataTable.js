'use client'

import { motion } from 'framer-motion'
import { Button } from './Button'

export default function DataTable({ data, columns, actions, keyField = 'id' }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-lg font-medium">No data available</div>
        <div className="text-gray-500 text-sm mt-2">Get started by adding your first item</div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((item, index) => (
              <motion.tr
                key={item[keyField]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
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
                      {actions.map((action, actionIndex) => (
                        <Button
                          key={actionIndex}
                          variant="ghost"
                          size="sm"
                          onClick={() => action.onClick(action.label === 'Delete' ? item[keyField] : item)}
                          className={`p-2 rounded-lg hover:scale-105 transition-all duration-200 ${action.className || 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                          title={action.label}
                        >
                          <action.icon className="h-4 w-4" />
                        </Button>
                      ))}
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}