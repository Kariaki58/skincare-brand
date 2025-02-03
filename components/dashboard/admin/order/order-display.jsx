"use client";
import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

export default function OrdersTable() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/order', 
                    { method: 'GET' },
                    { headers: { 'Content-Type': 'application/json' } }
                );
                if (!response.ok) throw new Error('Failed to fetch orders');
                const data = await response.json();
                setOrders(data.orders);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleDelete = async (orderId) => {
        if (confirm('Are you sure you want to delete this order?')) {
            try {
                const response = await fetch(`/api/order/${orderId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Delete failed');
                setOrders(orders.filter(order => order._id !== orderId));
            } catch (err) {
                alert(err.message);
            }
        }
    };

    if (loading) return <div className="text-center p-8">Loading orders...</div>;
    if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 rounded-tl-lg">Customer</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Products</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-4 align-top">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-900">{order.name}</span>
                                        <span className="text-sm text-gray-500">{order.country}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 align-top">
                                    <div className="flex flex-col">
                                        <a href={`mailto:${order.email}`} className="text-blue-600 hover:underline">{order.email}</a>
                                        <a href={`tel:${order.phone}`} className="text-gray-600 mt-1">{order.phone}</a>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="space-y-2">
                                        {order.cart.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center text-sm">
                                                <span className="text-gray-900">{item.name}</span>
                                                <div className="flex items-center gap-4 ml-4">
                                                    <span className="text-gray-600">x{item.quantity}</span>
                                                    <span className="font-medium text-gray-900 w-20 text-right">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-right align-top">
                                    <button
                                        onClick={() => handleDelete(order._id)}
                                        className="p-2 hover:bg-red-50 rounded-full text-red-600 hover:text-red-700 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {orders.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No orders found
                    </div>
                )}
            </div>
        </div>
    );
}