import fs from 'fs';

const files = [
  "MyComponents/UIUXDesignV2/UIUXDesignV2.jsx",
  "MyComponents/SupportManagedServicesV2/SupportManagedServicesV2.jsx",
  "MyComponents/ServiceDetailV2/ServiceDetailV2.jsx",
  "MyComponents/ServiceDetailV2/AdditionalServiceDetailV2.jsx",
  "MyComponents/ECommerceSolutionsV2/ECommerceSolutionsV2.jsx",
  "MyComponents/DataAnalyticsV2/DataAnalyticsV2.jsx",
  "MyComponents/CustomSoftwareDevelopmentV2/CustomSoftwareDevelopmentV2.jsx",
  "MyComponents/ApplicationDevelopmentV2/ApplicationDevelopmentV2.jsx",
  "MyComponents/AIDevelopmentV2/AIDevelopmentV2.jsx"
];

for (const file of files) {
  const path = `src/${file}`;
  let content = fs.readFileSync(path, 'utf-8');
  
  if (content.includes('useTestimonials(')) {
    console.log(`Skipping ${file}, already has useTestimonials`);
    continue;
  }
  
  // Add import if needed
  if (!content.includes('import { useTestimonials }')) {
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf('\n', lastImportIndex);
    content = content.substring(0, endOfLastImport + 1) +
      'import { useTestimonials } from "../../data/useTestimonials";\n' +
      content.substring(endOfLastImport + 1);
  }

  // Find what static array is used in the prop
  const match = content.match(/testimonials=\{(STATIC_[A-Z_]+)\}/);
  const staticVar = match ? match[1] : 'STATIC_TESTIMONIALS';

  // Replace prop
  content = content.replace(/testimonials=\{STATIC_[A-Z_]+\}/g, 'testimonials={testimonials}');
  
  // Insert hook inside the component function
  content = content.replace(/(export default function\s+[A-Za-z0-9_]+\s*\(\)\s*\{)/, `$1\n  const testimonials = useTestimonials(${staticVar});\n`);
  
  fs.writeFileSync(path, content, 'utf-8');
  console.log(`Updated ${file}`);
}
