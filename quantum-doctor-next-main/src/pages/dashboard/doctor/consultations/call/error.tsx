'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#3b392d] flex flex-col items-center justify-center gap-4">
      <h2 className="text-white text-xl">Something went wrong!</h2>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-4 py-2 bg-white text-[#3b392d] rounded-lg hover:bg-gray-100"
        >
          Try again
        </button>
        <button
          onClick={() => router.push('/consultation')}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          End Call
        </button>
      </div>
    </div>
  );
}

