import fs from 'fs';

let content = fs.readFileSync('HomepageV2/HomepageV2.jsx', 'utf-8');

// Replace testimonials section
const sectionRegex = /<section\s+className="v2-section\s+v2-section--gallery"\s+id="testimonials">[\s\S]*?<\/section>/;

if (sectionRegex.test(content)) {
  const replacement = `      {/* ══════════ 8 · TESTIMONIAL ══════════ */}
      <TestimonialSpotlight
        testimonials={TESTIMONIALS}
        heading="What clients say once we ship."
        stats={[
          { num: '40+', label: 'Companies trust us' },
          { num: '6', label: 'Services delivered' },
          { num: '100%', label: 'Source code ownership' }
        ]}
      />`;
  content = content.replace(sectionRegex, replacement);
  
  if (!content.includes('import TestimonialSpotlight')) {
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf('\n', lastImportIndex);
    content = content.substring(0, endOfLastImport + 1) +
      'import TestimonialSpotlight from "../Shared/TestimonialSpotlight";\n' +
      content.substring(endOfLastImport + 1);
  }

  // Remove states
  content = content.replace(/const \[activeQuote, setActiveQuote\] = useState\(0\);\s*const \[quotePaused, setQuotePaused\] = useState\(false\);/, '');

  // Remove useEffect
  content = content.replace(/\/\*\s*testimonial auto-advance[\s\S]*?}, \[activeQuote, quotePaused, TESTIMONIALS\.length\]\);/, '');

  fs.writeFileSync('HomepageV2/HomepageV2.jsx', content, 'utf-8');
  console.log('Fixed HomepageV2.jsx');
}
