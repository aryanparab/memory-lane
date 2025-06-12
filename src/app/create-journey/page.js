'use client';
import JourneyForm from "../components/JourneyForm";
import { useRouter } from 'next/navigation';

export default function CreateJourneyPage() {
  const router = useRouter();

  const handleCreate = async (formData) => {
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

  return (
    <JourneyForm
      mode="create"
      initialData={{
        title: '',
        theme: 'romantic',
        slides: [],
      }}
      onSubmit={handleCreate}
    />
  );
}
