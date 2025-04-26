// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const FUNDING_TYPES = [
  'Business',
  'Personal',
  'Community',
  'Education',
  'Real Estate',
  'Minorities',
  'Home Buyers',
  'Home Repairs',
  'Inventions',
  'Non-Profit',
];

const TESTIMONIALS = [
  { by: 'Karen R.', text: 'It is simple and easy to use. The wording is great and understandable.' },
  { by: 'Leslie A.', text: 'I especially like the variety of fields… stay encouraged.' },
  { by: 'Lunice S.', text: 'Hey, I recommend everyone… personal assistance, food & nutrition.' },
  { by: 'Roxanne J.', text: 'It was so thorough. The layout is nice with white on white.' },
  { by: 'Sandra G.', text: 'It was easy to understand… didn’t seem like a hassle at all.' },
  { by: 'Bobbie G.', text: 'Great way to give the less fortunate a chance to live a better life.' },
];

export default function HomePage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.replace('/login');
        return;
      }
      setSession(session);
      setLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session?.user) router.replace('/login');
    });

    return () => listener.subscription.unsubscribe();
  }, [router, supabase]);

  if (loading) return <p className="text-center mt-20">Loading…</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-800">Funding Applications Portal</h1>
          <nav className="space-x-4 text-sm text-gray-600">
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.replace('/login');
              }}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
            <a href="/terms" className="hover:underline">Terms</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="tel:1-888-261-4837" className="hover:underline">Contact (1‑888‑261‑4837)</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 text-center">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">Applications are NOW Available!</h2>
        <p className="text-lg text-gray-700 mb-6">
          Each year billions of dollars are awarded in grants and funding. Apply for your piece today!
        </p>
        <p className="italic text-gray-600 mb-6">Let's get started! Select your type of funding:</p>
        <div className="flex flex-wrap justify-center gap-2 px-4">
          {FUNDING_TYPES.map((type) => (
            <button
              key={type}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-16 h-16 bg-blue-100 mx-auto mb-4 rounded-full"></div>
            <h3 className="font-semibold mb-2">REGISTER</h3>
            <p>Your info is secure and easy to fill out.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-blue-100 mx-auto mb-4 rounded-full"></div>
            <h3 className="font-semibold mb-2">RESEARCH</h3>
            <p>Access thousands of grant sources.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-blue-100 mx-auto mb-4 rounded-full"></div>
            <h3 className="font-semibold mb-2">APPLY</h3>
            <p>No limit on the applications you can submit.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-6">What people are saying:</h3>
          <ul className="space-y-4 text-gray-700">
            {TESTIMONIALS.map(({ by, text }, i) => (
              <li key={i} className="border-l-4 border-blue-600 pl-4">
                “{text}”<br/><span className="italic">— {by}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Funding Categories */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6 text-center">FUNDING CATEGORIES</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Business 10,122 Applications',
              'Community 12,232 Applications',
              'Education 4,423 Applications',
              'Home Buyers 541 Applications',
              'Home Repairs 926 Applications',
              'Inventions 266 Applications',
              'Minorities 11,174 Applications',
              'Non‑Profit 11,406 Applications',
            ].map((cat) => (
              <div key={cat} className="p-4 border rounded hover:shadow">
                {cat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & CTA */}
      <section className="py-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h4 className="font-semibold mb-4">New applications added:</h4>
          <div className="flex justify-center gap-6 text-gray-800 mb-8">
            {[['Last 7 Days', '852'], ['Last 30 Days', '3,461'], ['Last 90 Days', '9,128']].map(([label, val]) => (
              <div key={label}>
                <p className="text-xl font-bold">{val}</p>
                <p className="text-sm">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-700 mb-6">
            Don’t wait. You could miss out on your share of this funding opportunity!
          </p>
          <button
            onClick={() => router.push('/registration')}
            className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800 transition"
          >
            Start the Application Process Today!
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-6 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Funding Applications Portal. All rights reserved.</p>
        <p className="mt-2 italic">
          Affiliated with government agency. Membership fees apply for full access.
        </p>
      </footer>
    </div>
  );
}
