'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 px-4 py-12 text-center">
      <h1 className="text-5xl font-bold mb-8 text-gray-800">Welcome to Memory Lane 💛</h1>
        <div className='flex flex-col sm:flex-row gap-6'>
          <button onClick={()=>router.push('/create-journey')}
           className="px-8 py-4 bg-yellow-400 text-white text-xl rounded-xl shadow-lg hover:bg-yellow-500 transition"
           >Create journey</button>

        <button onClick={() => router.push('/view-all')}
          className="px-8 py-4 bg-white border-2 border-yellow-400 text-yellow-600 text-xl rounded-xl shadow-lg hover:bg-yellow-100 transition"
        >
          View Previous Journeys
        </button>
        </div>
    </main>
  );
}
