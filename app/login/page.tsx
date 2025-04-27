'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import LoginHead from './head';

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [origin, setOrigin] = useState<string>('');

  useEffect(() => {
    // On mount, check existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('getSession error:', error);
      } else {
        setSession(session);
        if (session?.user) {
          router.replace('/'); // redirect if already logged in
        }
      }
    });

    // Listen for auth state changes (e.g., login)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        router.replace('/'); // redirect after login
      }
    });

    // Get window.location.origin only on client
    if (typeof window !== "undefined") {
  userAgent = window.navigator.userAgent;
    }

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL || origin}/`;

  return (
    <>
      {/* Inject head + scripts */}
      <LoginHead />

      {/* GTM noscript fallback */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-N644GXSK"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      {/* Main Auth UI */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Login to Grant App</h2>

          <Auth
  supabaseClient={supabase}
  appearance={{ theme: ThemeSupa }}
  providers={['google']}
  redirectTo={`${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/`}
/>

          {/* Show session info if available */}
          {session?.user && (
            <div className="mt-6 text-sm text-gray-800">
              <p>
                <strong>Email:</strong> {session.user.email}
              </p>
              <p>
                <strong>User ID:</strong> {session.user.id}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
