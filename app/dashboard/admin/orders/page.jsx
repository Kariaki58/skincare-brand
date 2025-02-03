import OrdersTable from "@/components/dashboard/admin/order/order-display";


export default function page() {
    return (
        <section>
            <h1 className="text-center font-bold uppercase my-4">orders</h1>
            <OrdersTable />
        </section>
    )
}