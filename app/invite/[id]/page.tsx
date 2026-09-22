import React from 'react';

export const dynamicParams = false;

// 1. Static Export ke liye required
export async function generateStaticParams() {
  return [{ id: 'demo' }];
}

export default function InvitePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2] text-[#2D141E]">
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace('/templates/editorial');`,
        }}
      />
      <div className="text-center font-serif">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#C9A24F] border-t-transparent" />
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#8A7B75]">
          Opening Your Wedding Invitation…
        </p>
      </div>
    </div>
  );
}
