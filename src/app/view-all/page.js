'use client';
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function ViewAllJourneys() {
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    const fetchAllJourneys = async () => {
      try {
        const res = await fetch('/api/journeys/list');
        if (!res.ok) throw new Error('Failed to fetch journey list');

        const data = await res.json();

        // No need to refetch journeys again, MongoDB already returned the objects
        const formattedJourneys = data.map(journey => ({
          id: journey.id,
          title: journey.title || "Untitled Journey",
          theme: journey.theme || "unknown",
        }));

        setJourneys(formattedJourneys);
      } catch (error) {
        console.error('Error loading journeys:', error);
      }
    };

    fetchAllJourneys();
  }, []);
return (
<div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📖 Previous Journeys</h1>
      {journeys.length === 0 ? (
        <p>Loading journeys...</p>
      ) : (
        <ul className="space-y-4">
          {journeys.map((j) => (
            <li key={j.id} className="border p-4 rounded-xl shadow-sm bg-white hover:shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">{j.title}</p>
                  <p className="text-sm text-gray-500">Theme: {j.theme}</p>
                </div>
                <Link href={`/edit-journey/${j.id}`}>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            ✏️ Edit Journey
          </button>
        </Link>
                <Link
                  href={`/journey-viewer/${j.id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  View Journey →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
);
}
