const fs = require('fs');

let content = fs.readFileSync('c:/Users/Yubraj/Desktop/code/radianos/apps/website/src/app/sandbox/components/types.ts', 'utf8');

// The sandboxComponents array is at the end of the file.
// We can use eval to parse it, sort it, and write it back.
const match = content.match(/export const sandboxComponents: SandboxComponentConfig\[\] = (\[[\s\S]*\])\s*$/);

if (match) {
    let arrayStr = match[1];
    let components = eval('(' + arrayStr + ')');

    // We want to sort the components. But we want to maintain category order?
    // Let's just sort the hero-section components and place them back where they were.
    // Actually, it's simpler to sort everything by category (using the first appearance of the category as its weight) 
    // and then by ID within the category.
    
    let categoryOrder = [];
    components.forEach(c => {
        if (!categoryOrder.includes(c.category)) {
            categoryOrder.push(c.category);
        }
    });

    components.sort((a, b) => {
        if (a.category !== b.category) {
            return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
        }
        // Within same category, sort by id
        // e.g. "hero-04" vs "hero-08"
        // we can use localeCompare with numeric: true
        return a.id.localeCompare(b.id, undefined, {numeric: true});
    });

    // Now stringify it nicely
    let newStr = JSON.stringify(components, null, '\t')
        .replace(/"([^"]+)":/g, '$1:') // remove quotes from keys
        .replace(/"/g, '"'); // just keeping double quotes

    // Let's manually format it to look exactly like before
    // JSON.stringify doesn't strip quotes from keys, so I used regex.
    
    // We should also ensure previewRoute has the correct string etc.
    let finalStr = newStr.replace(/"([^"]+)":/g, '$1:');
    
    content = content.replace(match[1], finalStr);
    fs.writeFileSync('c:/Users/Yubraj/Desktop/code/radianos/apps/website/src/app/sandbox/components/types.ts', content);
    console.log('Sorted successfully.');
} else {
    console.log('Could not find sandboxComponents array.');
}
