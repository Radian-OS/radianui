// "use client"
// import { fetchAllCategories, fetchFontsByCategory } from '@/lib/fetchFont';
// import { useEffect, useState } from 'react';

// const FontToggler = () => {
//     const [categories, setCategories] = useState<string[]>([]);
//     const [selectedCategory, setSelectedCategory] = useState<string>('');
//     const [fonts, setFonts] = useState<any[]>([]);
//     const [selectedFont, setSelectedFont] = useState<string>('');
//     const [previewText, setPreviewText] = useState<string>('The quick brown fox jumps over the lazy dog');

//     // Fetch categories on component mount
//     useEffect(() => {
//         const loadCategories = async () => {
//             const fetchedCategories = await fetchAllCategories();
//             setCategories(fetchedCategories);
//             if (fetchedCategories.length > 0) {
//                 setSelectedCategory(fetchedCategories[0]);
//             }
//         };
//         loadCategories();
//     }, []);

//     // Fetch fonts when category changes
//     useEffect(() => {
//         const loadFonts = async () => {
//             if (selectedCategory) {
//                 const fetchedFonts = await fetchFontsByCategory(selectedCategory);
//                 setFonts(fetchedFonts);

//                 if (fetchedFonts.length > 0) {
//                     setSelectedFont(fetchedFonts[0].family);
//                 }
//             }
//         };
//         loadFonts();
//     }, [selectedCategory]);

//     // Dynamic font loading
//     useEffect(() => {
//         const loadFont = async () => {
//             if (selectedFont) {
//                 try {
//                     // Dynamically load the font using Google Fonts
//                     const link = document.createElement('link');
//                     link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(selectedFont)}&display=swap`;
//                     link.rel = 'stylesheet';

//                     // Remove any previously added font link
//                     const existingLink = document.getElementById('dynamic-font-link');
//                     if (existingLink) {
//                         existingLink.remove();
//                     }

//                     // Add new font link
//                     link.id = 'dynamic-font-link';
//                     document.head.appendChild(link);

//                     // Update CSS custom properties
//                     document.documentElement.style.setProperty('--heading-font', `'${selectedFont}'`);
//                     document.documentElement.style.setProperty('--body-font', `'${selectedFont}'`);
//                 } catch (error) {
//                     console.error('Failed to load font:', error);
//                 }
//             }
//         };

//         loadFont();
//     }, [selectedFont]);

//     return (
//         <div className="max-w-4xl mx-auto p-4 bg-elevation-negative shadow-lg rounded-lg">
//             <h1 className="text-2xl font-bold mb-4">Google Fonts Previewer</h1>

//             {/* Category Selector */}
//             <div className="mb-4">
//                 <label htmlFor="category-select" className="block mb-2 font-semibold">
//                     Select Font Category:
//                 </label>
//                 <select
//                     id="category-select"
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                     className="w-full p-2 border rounded bg-elevation-negative"
//                 >
//                     {categories.map((category) => (
//                         <option key={category} value={category}>
//                             {category}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* Font Selector */}
//             <div className="mb-4">
//                 <label htmlFor="font-select" className="block mb-2 font-semibold">
//                     Select Font:
//                 </label>
//                 <select
//                     id="font-select"
//                     value={selectedFont}
//                     onChange={(e) => setSelectedFont(e.target.value)}
//                     className="w-full p-2 border rounded bg-elevation-negative"
//                 >
//                     {fonts.map((font) => (
//                         <option key={font.family} value={font.family}>
//                             {font.family}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* Preview Text Input */}
//             <div className="mb-4">
//                 <label htmlFor="preview-text" className="block mb-2 font-semibold">
//                     Preview Text:
//                 </label>
//                 <input
//                     id="preview-text"
//                     type="text"
//                     value={previewText}
//                     onChange={(e) => setPreviewText(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 />
//             </div>

//             {/* Font Preview */}
//             {selectedFont && (
//                 <div
//                     className="p-6 border rounded bg-elevation-level2 text-center"
//                     style={{ fontFamily: `var(--heading-font), sans-serif` }}
//                 >
//                     <h2 className="text-xl font-bold mb-2">{selectedFont}</h2>
//                     <p className="text-4xl">{previewText}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FontToggler;
