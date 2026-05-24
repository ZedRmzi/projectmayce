import React, { useState } from 'react';
import ArtModal from './ArtModal';

const ArtCard = ({ title, description, image, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='md:mb-8 xs:py-5 lg:py-0 relative'>
        {onDelete && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            title='Delete artwork'
            className='absolute top-2 right-2 z-10 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow hover:bg-red-800 transition-colors'
          >
            ×
          </button>
        )}
        <a onClick={() => setShowModal((prev) => !prev)}>
          <img src={image} className='transition-all cursor-pointer hover:scale-110' alt={title} />
          <ArtModal showModal={showModal} setShowModal={setShowModal} image={image} />
        </a>
      </div>
    </>
  );
};

export default ArtCard;
