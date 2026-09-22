import React from 'react';
import Link from 'next/link';

// Vercel static export ke liye required
export async function generateStaticParams() {
  return [
    { id: 'demo' },
    { id: 'preview' },
  ];
}

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function ManagePage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams?.id || 'demo';

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center py-6 border-b border-white/10 mb-8">
          <div>
            <h1 className="text-2xl font-serif text-[#D4AF37]">WedLink Dashboard</h1>
            <p className="text-slate-400 text-sm">Invitation ID: {id}</p>
          </div>
          <Link
            href={`/invite/${id}`}
            className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#E5C378] to-[#C9A24F] text-black hover:opacity-90 transition-opacity"
          >
            View Live Invite
          </Link>
        </header>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Total RSVPs</h3>
            <p className="text-3xl font-bold text-white">48</p>
            <p className="text-xs text-green-400 mt-2">↑ 12 new today</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Attending Guests</h3>
            <p className="text-3xl font-bold text-[#D4AF37]">92</p>
            <p className="text-xs text-slate-400 mt-2">Family & Friends</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Wishes & Blessings</h3>
            <p className="text-3xl font-bold text-white">35</p>
            <p className="text-xs text-slate-400 mt-2">Guestbook notes</p>
          </div>
        </div>

        {/* RSVP Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Guest Responses</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="border-b border-white/10 text-xs uppercase text-slate-400">
                <tr>
                  <th className="pb-3">Guest Name</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Guests</th>
                  <th className="pb-3">Dietary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-3 font-medium text-white">Rajesh Sharma</td>
                  <td className="py-3 text-green-400">Attending</td>
                  <td className="py-3">2 Adults</td>
                  <td className="py-3">Vegetarian</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-white">Pooja Patel</td>
                  <td className="py-3 text-green-400">Attending</td>
                  <td className="py-3">4 Adults</td>
                  <td className="py-3">Jain</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-white">Vikram Malhotra</td>
                  <td className="py-3 text-yellow-400">Tentative</td>
                  <td className="py-3">1 Adult</td>
                  <td className="py-3">No preference</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center py-6 text-slate-500 text-xs">
          WedLink • One Link • Endless Celebrations
        </div>
      </div>
    </div>
  );
}
