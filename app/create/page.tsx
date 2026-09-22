'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WeddingBuilderForm() {
  const router = useRouter();

  // फॉर्म का स्टेट
  const [formData, setFormData] = useState({
    brideName: '',
    groomName: '',
    weddingDate: '',
    cityVenue: '',
    selectedTemplate: 'royal-courtyard', // royal-courtyard, rose-letter, heritage, etc.
  });

  const [isPublishing, setIsPublishing] = useState(false);

  // 1. फ्री लाइव प्रीव्यू हैंडलर (यह बिना पेमेंट के सीधे टेम्पलेट खोलेगा)
  const handleLivePreview = () => {
    if (!formData.brideName || !formData.groomName) {
      alert('कृपया पहले दूल्हा और दुल्हन का नाम भरें!');
      return;
    }

    // डेटा को लोकल स्टोरेज में सेव करें ताकि टेम्पलेट इसे तुरंत पढ़ सके
    const previewPayload = {
      brideName: formData.brideName,
      groomName: formData.groomName,
      weddingDate: formData.weddingDate || '2026-11-19',
      venueName: formData.cityVenue || 'The Oberoi Udaivilas, Udaipur',
      orderBrideFirst: true
    };
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('wedlink_preview_data', JSON.stringify(previewPayload));
    }

    // चुने हुए टेम्पलेट को प्रीव्यू मोड में नए टैब में खोलें
    const targetUrl = `/templates/${formData.selectedTemplate}?preview=true`;
    window.open(targetUrl, '_blank');
  };

  // 2. फाइनल पब्लिश और पेमेंट हैंडलर (यह सिर्फ पब्लिश बटन दबाने पर चलेगा)
  const handleFinalPublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);

    try {
      // स्ट्राइप चेकआउट या पब्लिश API कॉल
      const res = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Stripe Checkout URL
      } else {
        alert('पेमेंट गेटवे शुरू हो रहा है...');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('ऑर्डर प्रोसेस करने में समस्या आई।');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-amber-200">
      <h2 className="text-2xl font-bold text-neutral-800 text-center mb-6">
        Customize Your Wedding Invite
      </h2>

      <form onSubmit={handleFinalPublish} className="space-y-4">
        {/* टेम्पलेट चयन */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">Select Theme</label>
          <select
            value={formData.selectedTemplate}
            onChange={(e) => setFormData({ ...formData, selectedTemplate: e.target.value })}
            className="w-full p-2.5 border rounded-xl bg-neutral-50 text-sm"
          >
            <option value="royal-courtyard">Royal Courtyard (3D Sliding Gates)</option>
            <option value="rose-letter">Rose Letter (Wax Seal & Envelope)</option>
            <option value="heritage">Heritage (Royal Palace)</option>
            <option value="editorial">Editorial (Modern Vogue)</option>
            <option value="garden-romance">Garden Romance (Floral)</option>
          </select>
        </div>

        {/* नाम और तारीख */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Bride's Name</label>
            <input
              type="text"
              placeholder="e.g. Aanya"
              value={formData.brideName}
              onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
              className="w-full p-2.5 border rounded-xl text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Groom's Name</label>
            <input
              type="text"
              placeholder="e.g. Kabir"
              value={formData.groomName}
              onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
              className="w-full p-2.5 border rounded-xl text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">Wedding Date</label>
          <input
            type="date"
            value={formData.weddingDate}
            onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
            className="w-full p-2.5 border rounded-xl text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">City / Venue</label>
          <input
            type="text"
            placeholder="e.g. The Oberoi Udaivilas, Udaipur"
            value={formData.cityVenue}
            onChange={(e) => setFormData({ ...formData, cityVenue: e.target.value })}
            className="w-full p-2.5 border rounded-xl text-sm"
            required
          />
        </div>

        {/* 2 अलग-अलग बटन */}
        <div className="pt-4 space-y-3">
          {/* बटन 1: फ्री लाइव प्रीव्यू (यह कभी पेमेंट नहीं मांगेगा) */}
          <button
            type="button"
            onClick={handleLivePreview}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg transition duration-200 flex items-center justify-center space-x-2"
          >
            <span>👁️ Free Live Preview (कार्ड लाइव देखें)</span>
          </button>

          {/* बटन 2: फाइनल पब्लिश और पेमेंट */}
          <button
            type="submit"
            disabled={isPublishing}
            className="w-full py-3 bg-neutral-900 hover:bg-black text-amber-300 font-semibold text-xs uppercase tracking-wider rounded-xl transition duration-200"
          >
            {isPublishing ? 'Publishing...' : '🚀 Publish & Get Permanent Link (₹1,499)'}
          </button>

          <p className="text-[11px] text-center text-neutral-500">
            💡 पहले <strong>"Free Live Preview"</strong> दबाकर अपना कार्ड चेक करें। पसंद आने पर ही पब्लिश करें।
          </p>
        </div>
      </form>
    </div>
  );
}
