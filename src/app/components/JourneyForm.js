'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function JourneyForm({ mode = 'create', initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [theme, setTheme] = useState(initialData.theme || 'romantic');
  const [context, setContext] = useState(initialData.context || '');
  const [images, setImages] = useState([]);
  const [existingSlides, setExistingSlides] = useState(initialData.slides || []);
  const [descriptions, setDescriptions] = useState(
    initialData.slides?.map(s => s.description) || []
  );
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newFiles]);
    setPreviews(prev => [...prev, ...newPreviews]);
    setDescriptions(prev => [...prev, ...new Array(newFiles.length).fill('')]);
  };

  const removeImage = (index, isExisting = false) => {
    if (isExisting) {
      const updated = [...existingSlides];
      updated.splice(index, 1);
      setExistingSlides(updated);
    } else {
      const updatedFiles = [...images];
      const updatedPreviews = [...previews];
      updatedFiles.splice(index - existingSlides.length, 1);
      updatedPreviews.splice(index - existingSlides.length, 1);
      setImages(updatedFiles);
      setPreviews(updatedPreviews);
    }
    const updatedDescs = [...descriptions];
    updatedDescs.splice(index, 1);
    setDescriptions(updatedDescs);
  };

  const handleDescChange = (index, value) => {
    const newDescs = [...descriptions];
    newDescs[index] = value;
    setDescriptions(newDescs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const updatedExistingSlides = existingSlides.map((slide, idx) => ({
    ...slide,
    description: descriptions[idx] || slide.description || '',
  }));
    formData.append('title', title);
    formData.append('theme', theme);
    formData.append('context', context);
    formData.append('id', initialData.id || '');
    formData.append('existingSlides', JSON.stringify(updatedExistingSlides));


    images.forEach((image, idx) => {
      formData.append('images', image);
      formData.append(`desc_${existingSlides.length + idx}`, descriptions[existingSlides.length + idx] || '');
    });

    const endpoint = mode === 'edit' ? '/api/journeys/update' : '/api/journeys';
    const res = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      router.push(`/journey-viewer/${data.id}`);
    } else {
      alert('Error submitting journey');
    }

    setLoading(false);
  };

  useEffect(() => {
    return () => previews.forEach(url => URL.revokeObjectURL(url));
  }, [previews]);

  const allSlides = [...existingSlides, ...images];

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6"
    >
      <h1 className="text-3xl font-semibold text-gray-800">
        {mode === 'edit' ? 'Edit Journey' : 'Create a New Journey'}
      </h1>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Theme</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          {['romantic', 'anniversary', 'memories', 'funny'].map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Context</label>
        <input
          type="text"
          placeholder="E.g. Wishing parents on their 27th anniversary"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-2">Upload Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-gray-700"
        />
      </div>

      <div className="space-y-6">
        {allSlides.map((img, idx) => {
          const isExisting = idx < existingSlides.length;
          const imgSrc = isExisting
            ? `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${img.images[0].filename}`
            : previews[idx - existingSlides.length];

          return (
            <div key={idx} className="bg-gray-50 border rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <img
                  src={imgSrc}
                  alt={`Preview ${idx}`}
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <div className="flex-1 space-y-2">
                  <textarea
                    rows={3}
                    placeholder="Enter a short description for this image"
                    value={descriptions[idx]}
                    onChange={(e) => handleDescChange(idx, e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx, isExisting)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
      >
        {loading ? 'Processing...' : mode === 'edit' ? 'Update Journey' : 'Create Journey'}
      </button>
    </form>
  );
}
