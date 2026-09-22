// app/templates/royal-courtyard/page.tsx

interface PageProps {
  searchParams: Promise<{ preview?: string; id?: string }>;
}

export default async function RoyalCourtyardPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const isPreviewMode = params.preview === 'true';

  // अगर प्रीव्यू मोड है, तो बिना पेमेंट चेक किए सीधा टेम्पलेट दिखाएं!
  if (isPreviewMode) {
    return (
      <div className="relative min-h-screen">
        {/* ऊपर एक छोटा सा प्रीव्यू बार */}
        <div className="bg-amber-900 text-amber-200 text-xs py-2 px-4 text-center font-medium flex justify-between items-center z-50 relative">
          <span>✨ Preview Mode (Not Published Yet)</span>
          <a
            href="/create"
            className="bg-amber-500 text-neutral-950 px-3 py-1 rounded-full font-bold hover:bg-amber-400"
          >
            Edit / Publish Link ↗
          </a>
        </div>

        {/* आपका पूरा असली 3D रॉयल टेम्पलेट कंपोनेंट */}
        <RoyalCourtyardTemplate />
      </div>
    );
  }

  // अगर लाइव लिंक है और पेड नहीं है, सिर्फ तब पेमेंट पेंडिंग दिखाएं
  // return <PaymentPendingView />;
}
