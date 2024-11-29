import React from 'react'

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
    <span className="sr-only">Loading...</span>
  </div>
  )
}

export const SkeletonTable = () => {
    return (
      <div className="w-full overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {/* Simulated headers */}
              {[...Array(5)].map((_, idx) => (
                <th
                  key={idx}
                  className="px-4 py-2 border border-gray-300 h-6 bg-gray-300 animate-pulse rounded"
                ></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Simulated rows */}
            {[...Array(5)].map((_, rowIdx) => (
              <tr key={rowIdx} className="even:bg-gray-50">
                {[...Array(5)].map((_, colIdx) => (
                  <td
                    key={colIdx}
                    className="border border-gray-300 px-4 py-2 h-6 bg-gray-200 animate-pulse rounded"
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

export default Loading