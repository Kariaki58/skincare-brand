export default function AppointmentForm({ onChange }) {
    return (
        <div className="">
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">Book an Appointment</h2>
            <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        onChange={(e) => onChange('name', e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            onChange={(e) => onChange('email', e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-white">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            onChange={(e) => onChange('phone', e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="">
                        <label htmlFor="date" className="block text-sm font-medium text-white">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            required
                            onChange={(e) => onChange('date', e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="">
                        <label htmlFor="time" className="block text-sm font-medium text-white">Time</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            required
                            onChange={(e) => onChange('time', e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        onChange={(e) => onChange('message', e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </form>
        </div>
    );
}