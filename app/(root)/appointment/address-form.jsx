"use client";
import { useState, useEffect } from "react";
import countryList from 'react-select-country-list';
import Select from 'react-select';

export default function AddressForm({ onChange }) {
    const [value, setValue] = useState('');
    const [countries, setCountries] = useState([]);
    
    useEffect(() => {
        // Ensure this runs only on the client
        setCountries(countryList().getData());
    }, []);

    const handleCountryChange = (selectedOption) => {
        setValue(selectedOption);
        onChange('country', selectedOption); // Pass the country data back to parent
    };

    return (
        <div className="">
            <h1 className="text-center text-2xl font-semibold text-white my-6">Address</h1>
            <form className="space-y-4">
                {/* Street Address */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor="street" className="block text-sm font-medium text-white">Street Address</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            required
                            onChange={(e) => onChange('street', e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Address Line 2 */}
                    <div>
                        <label htmlFor="addressLine2" className="block text-sm font-medium text-white">Address Line 2</label>
                        <input
                            type="text"
                            id="addressLine2"
                            name="addressLine2"
                            onChange={(e) => onChange('addressLine2', e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {/* City */}
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-white">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            onChange={(e) => onChange('city', e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* State/Province/Region */}
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-white">State/Province/Region</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            required
                            onChange={(e) => onChange('state', e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {/* Postal/Zip Code */}
                    <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-white">Postal/Zip Code</label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            required
                            onChange={(e) => onChange('postalCode', e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Country */}
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-white">Country</label>
                        {countries.length > 0 && (
                            <Select
                                options={countries}
                                value={value}
                                onChange={handleCountryChange}
                                className="mt-1 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
