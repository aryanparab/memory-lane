'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import JourneyViewer from '../../components/JourneyViewer';


export default function ViewJourney() {
  const { id } = useParams();
  const [journey, setJourney] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchJourney = async () => {
      try {
        const res = await fetch(`/api/journeys/${id}`);
        if (!res.ok) {
          setError('Journey not found');
          setJourney(null);
          return;
        }
        const data = await res.json();
        setJourney(data);
      } catch (err) {
        setError('Failed to fetch journey');
        setJourney(null);
      }
    };

    fetchJourney();
  }, [id]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!journey) return <p>Loading journey...</p>;

  return <JourneyViewer journey={journey} />;
}
