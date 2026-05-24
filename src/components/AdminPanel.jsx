import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../firebase';

const AdminPanel = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('Please select an image.');
      return;
    }
    setError('');
    setUploading(true);

    const storageRef = ref(storage, `artworks/${Date.now()}_${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
      },
      () => {
        setError('Upload failed. Please try again.');
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, 'artworks'), {
          title,
          description,
          imageUrl: downloadURL,
          storagePath: storageRef.fullPath,
          uploadedAt: serverTimestamp(),
        });
        setUploading(false);
        onClose();
      }
    );
  };

  return (
    <div
      className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl my-8'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-between items-center mb-6'>
          <h2 className='font-PassionsConflict text-[2rem] text-[#3B1524]'>Add Artwork</h2>
          <button
            onClick={onClose}
            className='text-[#3B1524] text-2xl font-bold leading-none hover:text-[#E82E88] transition-colors'
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col font-Noto'>
          <label className='text-sm text-[#3B1524] mb-2'>Image *</label>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='border-none pl-0 mb-2'
            required
          />
          {preview && (
            <img
              src={preview}
              alt='Preview'
              className='w-full max-h-48 object-contain mb-4 rounded border border-gray-200'
            />
          )}
          <label className='text-sm text-[#3B1524]'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Artwork title'
          />
          <label className='text-sm text-[#3B1524]'>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder='Describe the artwork...'
          />
          {uploading && (
            <div className='w-full bg-gray-200 rounded-full h-2 mb-4'>
              <div
                className='bg-[#E82E88] h-2 rounded-full transition-all duration-300'
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
          <input
            id='submit'
            type='submit'
            value={uploading ? `Uploading ${progress}%...` : 'Upload Artwork'}
            disabled={uploading}
            className='cursor-pointer'
          />
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
