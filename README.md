# 📝 Text Comparison App

A simple Node.js CLI tool for comparing two texts and analyzing their differences, vocabulary overlap, and stylistic similarity.


# 🚀 Features


   - Compare two text inputs and find common words

   - Calculate word similarity using Jaccard index

   - Analyze stylistic similarity (sentence and word length)

   - Count characters and words

   - Run directly from the command line

   - Output results in JSON format

# 📦 Installation

No installation required.  
Just make sure you have **Node.js v14+** installed.

# ▶️ Usage

1. Create two text files, e.g. `text1.txt` and `text2.txt`
2. Run the command:
```bash
node textCompare.js text1.txt text2.txt
```
3. You’ll get a JSON output like this:
```bash
{
  "common_words": ["some", "words", "text"],
  "word_similarity_percent": "42.86%",
  "style_match_percent": "87.50%"
}
```
