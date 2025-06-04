'use client';
import { useState ,useEffect} from 'react';
import { useRouter } from 'next/navigation';
// import themes from '@/data/themes';
// src/themes/themes.js

const themes = {
  romantic: {
    bgColor: 'bg-pink-50',
    emojis: ['❤️', '💌', '🌹'],
    animation: {
      type: 'float', // could be used to trigger framer-motion float
      speed: 10,
      opacity: 0.2,
    },
  },
  anniversary: {
    bgColor: 'bg-yellow-50',
    emojis: ['🎉', '💑', '🎂'],
    animation: {
      type: 'twinkle',
      speed: 8,
      opacity: 0.15,
    },
  },
  memories: {
    bgColor: 'bg-blue-50',
    emojis: ['📷', '🕰️', '🌄'],
    animation: {
      type: 'drift',
      speed: 12,
      opacity: 0.1,
    },
  },
  funny: {
    bgColor: 'bg-green-50',
    emojis: ['😂', '🤣', '🎈'],
    animation: {
      type: 'bounce',
      speed: 6,
      opacity: 0.25,
    },
  },
};



export default function CreateJourney() {
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('romantic');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const router = useRouter();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 30);
    setImages(files);
    setDescriptions(new Array(files.length).fill(''));
    const previewsUrls = files.map(file=> URL.createObjectURL(file));
    setPreviews(previewsUrls);
  };

  const handleDescChange = (index, value) => {
    const newDescs = [...descriptions];
    newDescs[index] = value;
    setDescriptions(newDescs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('theme', theme);

    images.forEach((image, idx) => {
      formData.append('images', image);
      formData.append(`desc_${idx}`, descriptions[idx] || '');
    });

    const res = await fetch('/api/journeys', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      router.push(`/journey-viewer/${data.id}`);
    } else {
      alert('Error creating journey');
    }
  };
  useEffect(() => {
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previews]);



  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Your Journey</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        <input
          type="text"
          name="title"
          placeholder="Journey Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <select
          name="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          {Object.keys(themes).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
          required
        />

        {images.length > 0 && (
          <div>
            <h2 className="font-semibold mb-2">Add Descriptions for Each Image</h2>
            {images.map((img, idx) => (
              <div key={idx} className="mb-6">
                {previews[idx] && (
                <img 
                src={previews[idx]}
                alt = {`Preview${idx}`}
                className="w-full max-w-xs mb-2 rounded border shadow"
                />
                )}
                <label className="block mb-1 font-medium">{img.name}</label>
                <textarea
                  rows={2}
                  placeholder="Description"
                  value={descriptions[idx]}
                  onChange={(e) => handleDescChange(idx, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
        >
          Create Journey
        </button>
      </form>
    </div>
  );
}
