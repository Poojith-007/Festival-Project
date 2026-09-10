'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect } from 'react';
import { auth, db, isFirebaseConfigured, storage } from '../../../lib/firebase/client';

interface GalleryRecord {
  id: string;
  title?: string;
  caption?: string;
  imageUrl: string;
  storagePath?: string;
  dayNumber?: number | null;
}

export default function AdminGalleryPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [dayNumber, setDayNumber] = useState('all');
  const [caption, setCaption] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [gallery, setGallery] = useState<GalleryRecord[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) return;
    const galleryQuery = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    return onSnapshot(galleryQuery, (snapshot) => {
      setGallery(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as GalleryRecord)));
    }, () => setError('Gallery metadata could not be loaded.'));
  }, []);

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []).filter((file) => file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024);
    setFiles(selected);
    setError(selected.length < (event.target.files?.length || 0) ? 'Only image files up to 10 MB are accepted.' : '');
  };

  const handleDelete = async (item: GalleryRecord) => {
    if (!db || !storage) return;
    setDeletingId(item.id);
    setError('');
    try {
      await deleteDoc(doc(db, 'gallery', item.id));
      if (item.storagePath) await deleteObject(ref(storage, item.storagePath));
      setStatus('Gallery item deleted.');
    } catch {
      setError('The gallery item could not be fully deleted. Check permissions and Storage status.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!files.length) {
      setError('Select at least one image.');
      return;
    }
    if (!isFirebaseConfigured || !auth?.currentUser || !db || !storage) {
      setError('Firebase Storage is not configured. Add Firebase settings before uploading.');
      return;
    }

    try {
      for (const file of files) {
        setStatus(`Uploading ${file.name}...`);
        const storagePath = `gallery/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
        const fileRef = ref(storage, storagePath);
        await uploadBytes(fileRef, file, { contentType: file.type });
        const imageUrl = await getDownloadURL(fileRef);
        await addDoc(collection(db, 'gallery'), {
          title: caption || file.name,
          caption,
          dayNumber: dayNumber === 'all' ? null : Number(dayNumber),
          imageUrl,
          storagePath,
          width: null,
          height: null,
          mimeType: file.type,
          published: true,
          createdBy: auth.currentUser.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      setFiles([]);
      setCaption('');
      setStatus(`${files.length} image${files.length === 1 ? '' : 's'} uploaded.`);
    } catch {
      setError('Upload failed. Check Storage permissions and try again.');
      setStatus('');
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-[#2D1B11] mb-6">Gallery Upload</h1>
      
      <form onSubmit={handleUpload} className="bg-white rounded-xl shadow-sm border border-[#E8B973]/30 p-6 mb-8">
        <h2 className="font-bold text-xl mb-4">Upload New Photos</h2>
        <div className="space-y-4">
          <label className="border-2 border-dashed border-[#E8B973] rounded-xl p-8 text-center bg-[#FFF9F0]/50 hover:bg-[#FFF9F0] cursor-pointer transition-colors block">
            <input type="file" accept="image/*" multiple onChange={handleFiles} className="sr-only" />
            <span className="text-4xl mb-2 block opacity-50">📁</span>
            <p className="font-bold text-[#F05A0A]">{files.length ? `${files.length} file${files.length === 1 ? '' : 's'} selected` : 'Click to select multiple files'}</p>
            <p className="text-sm text-[#2D1B11]/60">or drag and drop here</p>
          </label>
          
          <div>
            <label className="block text-sm font-bold text-[#2D1B11] mb-1">Select Day</label>
            <select value={dayNumber} onChange={(event) => setDayNumber(event.target.value)} className="w-full border border-[#E8B973]/50 rounded-lg p-2 bg-white">
              <option value="all">All / General</option>
              <option value="1">Day 1</option>
              <option value="2">Day 2</option>
              <option value="3">Day 3</option>
              <option value="4">Day 4</option>
              <option value="nimajjanam">Nimajjanam</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-[#2D1B11] mb-1">Optional Caption (applied to all)</label>
            <input type="text" value={caption} onChange={(event) => setCaption(event.target.value)} className="w-full border border-[#E8B973]/50 rounded-lg p-2" placeholder="e.g. Evening Aarti..." />
          </div>
          
          <button type="submit" className="w-full bg-[#F05A0A] text-white font-bold py-3 rounded-xl hover:bg-[#D04A08] transition-colors mt-4 disabled:opacity-50" disabled={!files.length}>
            Upload to Gallery
          </button>
          {status && <p className="text-sm font-semibold text-green-700">{status}</p>}
          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
        </div>
      </form>

      {gallery.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-[#E8B973]/30 p-6">
          <h2 className="font-bold text-xl mb-4">Published Gallery Items</h2>
          <div className="space-y-3">
            {gallery.map((item) => (
              <div key={item.id} className="flex items-center gap-3 border-b border-[#E8B973]/20 pb-3 last:border-0">
                <img src={item.imageUrl} alt={item.caption || item.title || 'Gallery item'} className="h-14 w-14 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#2D1B11]">{item.caption || item.title || 'Untitled image'}</p>
                  <p className="text-xs text-[#2D1B11]/60">{item.dayNumber ? `Day ${item.dayNumber}` : 'General'}</p>
                </div>
                <button type="button" onClick={() => void handleDelete(item)} disabled={deletingId === item.id} className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-100 disabled:opacity-50">
                  {deletingId === item.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
