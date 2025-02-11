import AppointMentCard from "./card/Appointment";
import CustomerCard from "./card/Customer";
import OrderCard from "./card/Order";

export default function CardDisplay() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            <CustomerCard />
            <AppointMentCard />
            <OrderCard />
        </section>
    );
}
