import React, { useState, useEffect } from 'react';
import { TypeService, Type } from '../../Services/TypeService';

const AddNewType: React.FC = () => {
    const [wtype, setwtype] = useState({
        wastetype: '',
        typedescription: ''
    });
    const [types, setTypes] = useState<Type[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch existing types
    const fetchTypes = async () => {
        try {
            const response = await TypeService.fetchAllTypes();
            setTypes(response);
        } catch (error) {
            setError('Failed to load waste types');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTypes();
    }, []);

    // Handle form changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setwtype(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await TypeService.createType(wtype);
            console.log(response);  // Handle the response as needed
            fetchTypes(); // Refresh the list after adding new type
        } catch (error) {
            console.error(error);  // Handle the error
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
                {/* Form Section */}
                <form 
                    onSubmit={handleSubmit} 
                    className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg space-y-4 mb-8"
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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

                {/* Existing Types Section */}
                <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Existing Waste Types</h2>

                    {loading && <p className="text-center text-gray-500">Loading...</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}
                    {!loading && types.length === 0 && <p className="text-center text-gray-500">No waste types found.</p>}

                    <div className="space-y-4">
                        {types.map((type: Type) => (
                            <div key={type.wastetype} className="bg-gray-100 p-4 rounded-md shadow-sm">
                                <h3 className="text-lg font-bold text-green-700">{type.wastetype}</h3>
                                <p className="text-sm text-gray-600">{type.typedescription}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddNewType;
