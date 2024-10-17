import React, { useState } from 'react';
import { TypeService } from '../../Services/TypeService';

const AddNewType = () => {
    const [wtype, setwtype] = useState({
        wastetype: '',
        typedescription: ''
    });

    const handlechange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setwtype(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handlesubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await TypeService.createType(wtype);
            console.log(response);  // Handle the response as needed
        } catch (error) {
            console.error(error);  // Handle the error
        }
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <form 
                    onSubmit={handlesubmit} 
                    className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg space-y-4"
                >
                    <h1 className="text-2xl font-bold text-center text-green-600 mb-4">Add New Waste Type</h1>

                    <div>
                        <label htmlFor="wastetype" className="block text-sm font-medium text-gray-700">
                            Waste Type
                        </label>
                        <input
                            type="text"
                            name="wastetype"
                            id="wastetype"
                            value={wtype.wastetype}
                            onChange={handlechange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="typedescription" className="block text-sm font-medium text-gray-700">
                            Type Description
                        </label>
                        <textarea
                            name="typedescription"
                            id="typedescription"
                            value={wtype.typedescription}
                            onChange={handlechange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            rows={4}
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button 
                            type="submit" 
                            className="w-full md:w-1/2 py-2 px-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddNewType;
