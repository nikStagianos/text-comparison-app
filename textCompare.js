const fs = require('fs')

// Split text into words

function getWords(text) {
    return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .split(/\s+/)
    .filter(Boolean)
}

// Split text into sentences

function getSentences(text) {
    return text
    .split(/[.!?]/)
    .map(s => s.trim())
    .filter(Boolean)
}

// Jaccard Similarity between two arrays

function jaccardSimilarity(arr1, arr2) {
    const set1 = new Set(arr1)
    const set2 = new Set(arr2)
    const commonSet = new Set([...set1].filter(word => set2.has(word)))
    const uniqueWords = new Set([...set1, ...set2])
    return (commonSet.size / uniqueWords.size) * 100; 
}

// Similarities based on sentences and word length

function similarities(text1, text2) {
const sentences1 = getSentences(text1)
const sentences2 = getSentences(text2)

const avgSentenceLength1 = sentences1.reduce((a, s) => a + getWords(s).length, 0) / sentences1.length || 1
const avgSentenceLength2 = sentences2.reduce((a, s) => a + getWords(s).length, 0) / sentences2.length || 1

const words1 = getWords(text1)
const words2 = getWords(text2)

const avgWordLength1 = words1.reduce((a, w) => a + w.length, 0) / words1.length || 1
const avgWordLength2 = words2.reduce((a, w) => a + w.length, 0) / words2.length || 1

const sentenceScore = 100 - Math.abs(avgSentenceLength1 - avgSentenceLength2) * 5
const wordScore = 100 - Math.abs(avgWordLength1 - avgWordLength2) * 10

return Math.max(0, Math.min(100, (sentenceScore + wordScore) / 2))
}

// Main Comparison function

function compareTexts(text1, text2) {
    const words1 = getWords(text1);
    const words2 = getWords(text2);
    
    return {
        common_words: [...new Set(words1.filter(w => words2.includes(w)))],
        word_similarity_percent: jaccardSimilarity(words1, words2).toFixed(2) + '%',
        style_match_percent: similarities(text1, text2).toFixed(2) + '%'
    };
}

// Command line file handling

const [,, file1, file2] = process.argv;

if (!file1 || !file2) {
    console.log('Χρήση: node textAnalyzer.js <file1> <file2>');
    process.exit(1);
}

const text1 = fs.readFileSync(file1, 'utf8');
const text2 = fs.readFileSync(file2, 'utf8');

const result = compareTexts(text1, text2);
console.log(JSON.stringify(result, null, 2));
