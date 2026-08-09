'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function SignUpRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirectUrl = searchParams.get('redirect');
    const target = redirectUrl
      ? `/?auth=signup&redirect=${encodeURIComponent(redirectUrl)}`
      : '/?auth=signup';
    router.replace(target);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex items-center justify-center p-4">
      <div className="text-xs font-mono text-[#666664] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse" />
        <span>Opening authentication modal...</span>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F4F0]" />}>
      <SignUpRedirectContent />
    </Suspense>
  );
}

