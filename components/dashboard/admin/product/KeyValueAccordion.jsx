"use client";
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";


export function KeyValueAccordion({ info, setInfo }) {
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");

    const addInfo = () => {
        if (key && value) {
            setInfo([...info, { key, value }]);
            setKey("");
            setValue("");
        }
    };

    const removeInfo = (index) => {
        setInfo(info.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h3 className="font-bold text-lg">Additional Information</h3>
            <div className="flex gap-2 mt-2">
                <input 
                    type="text" 
                    placeholder="Key (e.g., Brand)" 
                    value={key} 
                    onChange={(e) => setKey(e.target.value)} 
                    className="border p-2 w-1/2 rounded-md"
                />
                <input 
                    type="text" 
                    placeholder="Value (e.g., Vently)" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    className="border p-2 w-1/2 rounded-md"
                />
                <button type="button" onClick={addInfo} className="bg-blue-500 text-white px-3 py-2 rounded-md flex items-center">
                    <FiPlus size={20} />
                </button>
            </div>
            <div className="mt-4 max-w-lg mx-auto">
                {info.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border p-2 rounded-md mt-2">
                        <span>{item.key}: {item.value}</span>
                        <button onClick={() => removeInfo(index)} className="text-red-500">
                            <FiMinus size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
