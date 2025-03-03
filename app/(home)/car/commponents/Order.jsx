import React from 'react'

function Order({order}) {
    return (
        <div className="p-6 shadow-lg rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 transition-transform transform hover:scale-105">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order #{order.id}</h3>
          <span className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm font-medium">{order.status}</span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">Payment: <span className="font-medium">{order.payment_method}</span> ({order.payment_status})</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">Delivery: <span className="font-medium">{order.delvery_type}</span></p>
        <p className="text-sm font-bold text-gray-900 dark:text-white mt-3">Total Price: {order.price}</p>
        <div className="mt-4">
          <p className="text-gray-800 dark:text-gray-200 font-medium mb-2">Products:</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="px-3 py-2 text-left text-gray-900 dark:text-white">img</th>
                <th className="px-3 py-2 text-left text-gray-900 dark:text-white">Name</th>
                <th className="px-3 py-2 text-left text-gray-900 dark:text-white">Quantity</th>
                <th className="px-3 py-2 text-left text-gray-900 dark:text-white">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((product, index) => (
                <tr key={index} className="border-t border-gray-300 dark:border-gray-600">
                  <td className="px-3 py-2 text-gray-800 dark:text-gray-300">
                    <img src={product.proudect.img ? product.proudect.img 
                        : "https://flowbite.com/docs/images/products/apple-watch.png"} 
                        alt={product.name} className='rounded-full w-[50px] h-[50px]' />
                  </td>
                  <td className="px-3 py-2 text-gray-800 dark:text-gray-300">{product.proudect.name}</td>
                  <td className="px-3 py-2 text-gray-800 dark:text-gray-300">{product.quantity}</td>
                  <td className="px-3 py-2 text-gray-800 dark:text-gray-300">{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      );
}

export default Order