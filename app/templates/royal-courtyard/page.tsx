// =============================================================
    // 5. AUTO-SYNC WITH WEDLINK BUILDER (Live Preview Updates)
    // =============================================================
    function syncWithBuilder() {
      try {
        const raw = localStorage.getItem('wedlink_official_builder') || localStorage.getItem('wedlink_shaadipath_builder');
        if (!raw) return;
        const d = JSON.parse(raw);

        const bName = d.brideName || 'Aanya';
        const gName = d.groomName || 'Kabir';
        const cTitle = d.orderBrideFirst ? (bName + ' & ' + gName) : (gName + ' & ' + bName);

        document.title = cTitle + ' — The Royal Wedding';

        // 1. 3D कर्टेन के ऊपर दूल्हा-दुल्हन का नाम
        const curtainTitle = document.querySelector('#sealContainer h2');
        if (curtainTitle) curtainTitle.textContent = cTitle;

        // 2. हीरो सेक्शन में दोनों के नाम
        const heroNames = document.querySelectorAll('section:nth-of-type(1) h1');
        if (heroNames.length >= 2) {
          heroNames[0].textContent = d.orderBrideFirst ? bName : gName;
          heroNames.textContent = d.orderBrideFirst ? gName : bName;
        }

        // हीरो सेक्शन में तारीख
        const heroDate = document.querySelector('section:nth-of-type(1) div.inline-block p');
        if (heroDate && d.weddingDate) {
          heroDate.textContent = 'The Wedding • ' + d.weddingDate;
        }

        // 3. काउंटडाउन टाइमर की तारीख अपडेट
        if (d.weddingDate) {
          weddingDate = new Date(d.weddingDate + 'T16:00:00+05:30').getTime();
          if (typeof updateCountdown === 'function') updateCountdown();
        }

        // 4. आइवरी सेक्शन में दूल्हा-दुल्हन और माता-पिता के नाम
        const formalNames = document.querySelectorAll('section:nth-of-type(2) h2');
        if (formalNames.length >= 2) {
          formalNames[0].textContent = d.orderBrideFirst ? bName : gName;
          formalNames.textContent = d.orderBrideFirst ? gName : bName;
        }

        const cards = document.querySelectorAll('section:nth-of-type(2) .grid > div');
        if (cards.length >= 2) {
          // Groom side
          const gF = cards[0].querySelectorAll('p.font-semibold')[0];
          const gM = cards[0].querySelectorAll('p.font-semibold');
          if (gF && d.groomFather) gF.textContent = d.groomFather;
          if (gM && d.groomMother) gM.textContent = d.groomMother;

          // Bride side
          const bF = cards.querySelectorAll('p.font-semibold')[0];
          const bM = cards.querySelectorAll('p.font-semibold');
          if (bF && d.brideFather) bF.textContent = d.brideFather;
          if (bM && d.brideMother) bM.textContent = d.brideMother;
        }

        const ivoryDate = document.querySelector('section:nth-of-type(2) div.inline-block p');
        if (ivoryDate && d.weddingDate) {
          ivoryDate.textContent = d.weddingDate;
        }

        // 5. तीनों इवेंट्स (Haldi, Sangeet, Pheras) की टाइमिंग, वेन्यू और ड्रेस कोड
        if (d.eventsList && d.eventsList.length > 0) {
          d.eventsList.forEach((ev, idx) => {
            if (eventData[idx]) {
              eventData[idx].title = ev.name || eventData[idx].title;
              eventData[idx].time = (ev.date + ' • ' + ev.time) || eventData[idx].time;
              eventData[idx].venue = ev.venue || eventData[idx].venue;
              eventData[idx].dress = ('Dress Code: ' + ev.dress) || eventData[idx].dress;
            }
          });
          const t0 = document.getElementById('tab0');
          const t1 = document.getElementById('tab1');
          const t2 = document.getElementById('tab2');
          if (t0 && d.eventsList[0]) t0.innerHTML = d.eventsList[0].name.split(' ')[0] + '<br><span class="text-[8px] font-normal opacity-80">' + d.eventsList[0].date + '</span>';
          if (t1 && d.eventsList) t1.innerHTML = d.eventsList.name.split(' ')[0] + '<br><span class="text-[8px] font-normal opacity-80">' + d.eventsList.date + '</span>';
          if (t2 && d.eventsList) t2.innerHTML = d.eventsList.name.split(' ')[0] + '<br><span class="text-[8px] font-normal opacity-80">' + d.eventsList.date + '</span>';
          if (typeof switchEventTab === 'function') switchEventTab(0);
        }

        // 6. वेन्यू कार्ड
        const vH3 = document.querySelector('section:nth-of-type(4) h3');
        if (vH3 && d.venueName) vH3.textContent = d.venueName;
        const vP = document.querySelector('section:nth-of-type(4) p.text-xs');
        if (vP && d.venueCity) vP.textContent = d.venueName + ', ' + d.venueCity;

        // 7. फुटर और मोनोग्राम
        const footerTitle = document.querySelector('footer h3');
        if (footerTitle) footerTitle.textContent = cTitle;
        const footerDate = document.querySelector('footer p.text-\\[10px\\]');
        if (footerDate && d.weddingDate) footerDate.textContent = d.weddingDate;
        const mono = document.querySelector('footer .w-16 span');
        if (mono && bName && gName) {
          mono.textContent = bName[0].toUpperCase() + ' • ' + gName[0].toUpperCase();
        }
      } catch(err) {
        console.log('WedLink live sync error:', err);
      }
    }
    window.addEventListener('DOMContentLoaded', syncWithBuilder);
