import fs from 'fs';
import path from 'path';

const files = [
    'c:/Websites/Codelix_new/Codelix-new/codelix-new/src/MyComponents/AboutV2/AboutV2.jsx',
    'c:/Websites/Codelix_new/Codelix-new/codelix-new/src/MyComponents/DataAnalyticsV2/DataAnalyticsV2.jsx',
    'c:/Websites/Codelix_new/Codelix-new/codelix-new/src/MyComponents/HomepageV2/HomepageV2.jsx',
    'c:/Websites/Codelix_new/Codelix-new/codelix-new/src/MyComponents/ServiceDetailV2/ServiceDetailV2.jsx',
    'c:/Websites/Codelix_new/Codelix-new/codelix-new/src/MyComponents/ServicesV2/ServicesV2.jsx',
    'c:/Websites/Codelix_new/Codelix-new/codelix-new/src/MyComponents/UIUXDesignV2/UIUXDesignV2.jsx'
];

let changedCount = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    const reSales = /<div className="v2-footer-card">\s*<h5>For Sales<\/h5>[\s\S]*?<\/div>/;
    const reJobs = /<div className="v2-footer-card">\s*<h5>Looking For Jobs<\/h5>[\s\S]*?<\/div>/;
    
    const salesMatch = content.match(reSales);
    const jobsMatch = content.match(reJobs);
    
    if (salesMatch && jobsMatch && content.indexOf(salesMatch[0]) < content.indexOf(jobsMatch[0])) {
        const salesStr = salesMatch[0];
        const jobsStr = jobsMatch[0];
        
        content = content.replace(salesStr, "___PLACEHOLDER_FOR_JOBS___");
        content = content.replace(jobsStr, salesStr);
        content = content.replace("___PLACEHOLDER_FOR_JOBS___", jobsStr);
        
        fs.writeFileSync(file, content, 'utf8');
        changedCount++;
        console.log("Updated: " + file);
    }
}

console.log("Total files updated with regex match: " + changedCount);
