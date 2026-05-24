import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';
import { useAuth } from '../context/AuthContext';
import ArtCard from '../components/ArtCard';
import AdminPanel from '../components/AdminPanel';

const Art = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'artworks'), orderBy('uploadedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setArtworks(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleDelete = async (artwork) => {
    if (!window.confirm(`Delete "${artwork.title || 'this artwork'}"?`)) return;
    await deleteDoc(doc(db, 'artworks', artwork.id));
    if (artwork.storagePath) {
      await deleteObject(ref(storage, artwork.storagePath)).catch(() => {});
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center py-20 font-Noto text-[#3B1524]'>
        Loading...
      </div>
    );
  }

  return (
    <>
      {user && (
        <button
          onClick={() => setShowAdminPanel(true)}
          title='Add artwork'
          className='fixed bottom-8 right-8 z-40 bg-[#E82E88] text-white rounded-full w-14 h-14 text-3xl shadow-lg hover:bg-[#3B1524] transition-colors flex items-center justify-center'
        >
          +
        </button>
      )}
      {showAdminPanel && <AdminPanel onClose={() => setShowAdminPanel(false)} />}
      <div className='lg:flex lg:flex-row lg:flex-wrap lg:justify-center lg:mx-[120px] lg:space-y-0 mt-10 flex flex-col mx-auto lg:items-center'>
        {artworks.map((artwork) => (
          <div key={artwork.id} className='max-w-sm flex-initial lg:px-3 lg:my-auto lg:object-contain'>
            <ArtCard
              title={artwork.title}
              description={artwork.description}
              image={artwork.imageUrl}
              onDelete={user ? () => handleDelete(artwork) : null}
            />
          </div>
        ))}
        {artworks.length === 0 && (
          <p className='font-Noto text-[#3B1524] py-20 opacity-60'>No artworks yet.</p>
        )}
      </div>
    </>
  );
};

export default Art;
