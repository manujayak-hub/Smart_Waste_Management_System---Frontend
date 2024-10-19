import React, { useState, useEffect } from 'react';
import { useFetchUser } from '../../Hooks/GetUserID';
import { WasteCollectionService, WasteRecord } from '../../Services/WasteCollectionService';
import Navbar from '../../Components/Navbar/Navbar';
import WasteCollecteHeader from '../../Components/waste_collecte_header';
import Footer from '../../Components/Footer/Footer';

const Waste_Collect_User: React.FC = () => {
  const [wasteCollections, setWasteCollections] = useState<WasteRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { residenceId } = useFetchUser(); 

  useEffect(() => {
    const fetchWasteCollections = async () => {
      if (!residenceId) return;

      try {
        const data = await WasteCollectionService.fetchWasteRecordsByResidenceId(residenceId);
        setWasteCollections(data); // directly set the data from the service
      } catch (err) {
        setError('Failed to fetch waste collections');
      } finally {
        setLoading(false);
      }
    };

    fetchWasteCollections();
  }, [residenceId]); // Fetch data when residenceId changes

  

  return (
    <>
    <Navbar />
    <WasteCollecteHeader />
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
        All Waste Collection Records
      </h2>
  
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
  
      {!loading && wasteCollections.length === 0 && (
        <p className="text-center text-gray-600">No waste collections found.</p>
      )}
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wasteCollections.map((collection) => (
          <div
            key={collection._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Waste Collection Details */}
            <div className="text-gray-700 space-y-2">
              <p className="font-semibold text-lg">
                <strong>Residence ID:</strong> {collection.residenceId}
              </p>
              <p>
                <strong>Collection Date:</strong>{' '}
                {new Date(collection.collectionDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Waste Type:</strong> {collection.wasteType}
              </p>
              <p>
                <strong>Amount Collected:</strong> {collection.amountCollected} kg
              </p>
              <p>
                <strong>Collector Name:</strong> {collection.collectorName}
              </p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </>
  
  );
};

export default Waste_Collect_User;
