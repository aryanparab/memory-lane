'use client';
import { use } from 'react';
import { useEffect, useState } from 'react';
import JourneyForm from '../../components/JourneyForm';
export default function EditJourneyPage({ params }) {
  const { id } = use(params);

  const [journey, setJourney] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJourney() {
      const res = await fetch(`/api/journeys/${id}`);
      const data = await res.json();
      setJourney(data);
      setLoading(false);
    }

    fetchJourney();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!journey) return <p>Journey not found</p>;

  return (
    <JourneyForm  mode="edit" initialData={journey} />
  );
}
