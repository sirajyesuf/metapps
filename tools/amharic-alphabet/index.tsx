"use client"

import { useState } from "react"

interface AmharicCharacter {
  character: string
  transliteration: string
  category: string
}

const amharicAlphabet: AmharicCharacter[] = [
  // Ha series
  { character: "ሀ", transliteration: "ha", category: "Ha" },
  { character: "ሁ", transliteration: "hu", category: "Ha" },
  { character: "ሂ", transliteration: "hi", category: "Ha" },
  { character: "ሃ", transliteration: "haa", category: "Ha" },
  { character: "ሄ", transliteration: "hee", category: "Ha" },
  { character: "ህ", transliteration: "he", category: "Ha" },
  { character: "ሆ", transliteration: "ho", category: "Ha" },
  
  // La series
  { character: "ለ", transliteration: "la", category: "La" },
  { character: "ሉ", transliteration: "lu", category: "La" },
  { character: "ሊ", transliteration: "li", category: "La" },
  { character: "ላ", transliteration: "laa", category: "La" },
  { character: "ሌ", transliteration: "lee", category: "La" },
  { character: "ል", transliteration: "le", category: "La" },
  { character: "ሎ", transliteration: "lo", category: "La" },
  
  // Hha series
  { character: "ሐ", transliteration: "hha", category: "Hha" },
  { character: "ሑ", transliteration: "hhu", category: "Hha" },
  { character: "ሒ", transliteration: "hhi", category: "Hha" },
  { character: "ሓ", transliteration: "hhaa", category: "Hha" },
  { character: "ሔ", transliteration: "hhee", category: "Hha" },
  { character: "ሕ", transliteration: "hhe", category: "Hha" },
  { character: "ሖ", transliteration: "hho", category: "Hha" },
  
  // Ma series
  { character: "መ", transliteration: "ma", category: "Ma" },
  { character: "ሙ", transliteration: "mu", category: "Ma" },
  { character: "ሚ", transliteration: "mi", category: "Ma" },
  { character: "ማ", transliteration: "maa", category: "Ma" },
  { character: "ሜ", transliteration: "mee", category: "Ma" },
  { character: "ም", transliteration: "me", category: "Ma" },
  { character: "ሞ", transliteration: "mo", category: "Ma" },
  
  // Sza series
  { character: "ሠ", transliteration: "sza", category: "Sza" },
  { character: "ሡ", transliteration: "szu", category: "Sza" },
  { character: "ሢ", transliteration: "szi", category: "Sza" },
  { character: "ሣ", transliteration: "szaa", category: "Sza" },
  { character: "ሤ", transliteration: "szee", category: "Sza" },
  { character: "ሥ", transliteration: "sze", category: "Sza" },
  { character: "ሦ", transliteration: "szo", category: "Sza" },
  
  // Ra series
  { character: "ረ", transliteration: "ra", category: "Ra" },
  { character: "ሩ", transliteration: "ru", category: "Ra" },
  { character: "ሪ", transliteration: "ri", category: "Ra" },
  { character: "ራ", transliteration: "raa", category: "Ra" },
  { character: "ሬ", transliteration: "ree", category: "Ra" },
  { character: "ር", transliteration: "re", category: "Ra" },
  { character: "ሮ", transliteration: "ro", category: "Ra" },
  
  // Sa series
  { character: "ሰ", transliteration: "sa", category: "Sa" },
  { character: "ሱ", transliteration: "su", category: "Sa" },
  { character: "ሲ", transliteration: "si", category: "Sa" },
  { character: "ሳ", transliteration: "saa", category: "Sa" },
  { character: "ሴ", transliteration: "see", category: "Sa" },
  { character: "ስ", transliteration: "se", category: "Sa" },
  { character: "ሶ", transliteration: "so", category: "Sa" },
  
  // Sha series
  { character: "ሸ", transliteration: "sha", category: "Sha" },
  { character: "ሹ", transliteration: "shu", category: "Sha" },
  { character: "ሺ", transliteration: "shi", category: "Sha" },
  { character: "ሻ", transliteration: "shaa", category: "Sha" },
  { character: "ሼ", transliteration: "shee", category: "Sha" },
  { character: "ሽ", transliteration: "she", category: "Sha" },
  { character: "ሾ", transliteration: "sho", category: "Sha" },
  
  // Qa series
  { character: "ቀ", transliteration: "qa", category: "Qa" },
  { character: "ቁ", transliteration: "qu", category: "Qa" },
  { character: "ቂ", transliteration: "qi", category: "Qa" },
  { character: "ቃ", transliteration: "qaa", category: "Qa" },
  { character: "ቄ", transliteration: "qee", category: "Qa" },
  { character: "ቅ", transliteration: "qe", category: "Qa" },
  { character: "ቆ", transliteration: "qo", category: "Qa" },
  
  // Qha series
  { character: "ቐ", transliteration: "qha", category: "Qha" },
  { character: "ቑ", transliteration: "qhu", category: "Qha" },
  { character: "ቒ", transliteration: "qhi", category: "Qha" },
  { character: "ቓ", transliteration: "qhaa", category: "Qha" },
  { character: "ቔ", transliteration: "qhee", category: "Qha" },
  { character: "ቕ", transliteration: "qhe", category: "Qha" },
  { character: "ቖ", transliteration: "qho", category: "Qha" },
  
  // Ba series
  { character: "በ", transliteration: "ba", category: "Ba" },
  { character: "ቡ", transliteration: "bu", category: "Ba" },
  { character: "ቢ", transliteration: "bi", category: "Ba" },
  { character: "ባ", transliteration: "baa", category: "Ba" },
  { character: "ቤ", transliteration: "bee", category: "Ba" },
  { character: "ብ", transliteration: "be", category: "Ba" },
  { character: "ቦ", transliteration: "bo", category: "Ba" },
  
  // Va series
  { character: "ቨ", transliteration: "va", category: "Va" },
  { character: "ቩ", transliteration: "vu", category: "Va" },
  { character: "ቪ", transliteration: "vi", category: "Va" },
  { character: "ቫ", transliteration: "vaa", category: "Va" },
  { character: "ቬ", transliteration: "vee", category: "Va" },
  { character: "ቭ", transliteration: "ve", category: "Va" },
  { character: "ቮ", transliteration: "vo", category: "Va" },
  
  // Ta series
  { character: "ተ", transliteration: "ta", category: "Ta" },
  { character: "ቱ", transliteration: "tu", category: "Ta" },
  { character: "ቲ", transliteration: "ti", category: "Ta" },
  { character: "ታ", transliteration: "taa", category: "Ta" },
  { character: "ቴ", transliteration: "tee", category: "Ta" },
  { character: "ት", transliteration: "te", category: "Ta" },
  { character: "ቶ", transliteration: "to", category: "Ta" },
  
  // Ca series
  { character: "ቸ", transliteration: "ca", category: "Ca" },
  { character: "ቹ", transliteration: "cu", category: "Ca" },
  { character: "ቺ", transliteration: "ci", category: "Ca" },
  { character: "ቻ", transliteration: "caa", category: "Ca" },
  { character: "ቼ", transliteration: "cee", category: "Ca" },
  { character: "ች", transliteration: "ce", category: "Ca" },
  { character: "ቾ", transliteration: "co", category: "Ca" },
  
  // Xa series
  { character: "ኀ", transliteration: "xa", category: "Xa" },
  { character: "ኁ", transliteration: "xu", category: "Xa" },
  { character: "ኂ", transliteration: "xi", category: "Xa" },
  { character: "ኃ", transliteration: "xaa", category: "Xa" },
  { character: "ኄ", transliteration: "xee", category: "Xa" },
  { character: "ኅ", transliteration: "xe", category: "Xa" },
  { character: "ኆ", transliteration: "xo", category: "Xa" },
  
  // Na series
  { character: "ነ", transliteration: "na", category: "Na" },
  { character: "ኑ", transliteration: "nu", category: "Na" },
  { character: "ኒ", transliteration: "ni", category: "Na" },
  { character: "ና", transliteration: "naa", category: "Na" },
  { character: "ኔ", transliteration: "nee", category: "Na" },
  { character: "ን", transliteration: "ne", category: "Na" },
  { character: "ኖ", transliteration: "no", category: "Na" },
  
  // Nya series
  { character: "ኘ", transliteration: "nya", category: "Nya" },
  { character: "ኙ", transliteration: "nyu", category: "Nya" },
  { character: "ኚ", transliteration: "nyi", category: "Nya" },
  { character: "ኛ", transliteration: "nyaa", category: "Nya" },
  { character: "ኜ", transliteration: "nyee", category: "Nya" },
  { character: "ኝ", transliteration: "nye", category: "Nya" },
  { character: "ኞ", transliteration: "nyo", category: "Nya" },
  
  // A series
  { character: "አ", transliteration: "a", category: "A" },
  { character: "ኡ", transliteration: "au", category: "A" },
  { character: "ኢ", transliteration: "ai", category: "A" },
  { character: "ኣ", transliteration: "aa", category: "A" },
  { character: "ኤ", transliteration: "aee", category: "A" },
  { character: "እ", transliteration: "ae", category: "A" },
  { character: "ኦ", transliteration: "ao", category: "A" },
  
  // Ka series
  { character: "ከ", transliteration: "ka", category: "Ka" },
  { character: "ኩ", transliteration: "ku", category: "Ka" },
  { character: "ኪ", transliteration: "ki", category: "Ka" },
  { character: "ካ", transliteration: "kaa", category: "Ka" },
  { character: "ኬ", transliteration: "kee", category: "Ka" },
  { character: "ክ", transliteration: "ke", category: "Ka" },
  { character: "ኮ", transliteration: "ko", category: "Ka" },
  
  // Kxa series
  { character: "ኸ", transliteration: "kxa", category: "Kxa" },
  { character: "ኹ", transliteration: "kxu", category: "Kxa" },
  { character: "ኺ", transliteration: "kxi", category: "Kxa" },
  { character: "ኻ", transliteration: "kxaa", category: "Kxa" },
  { character: "ኼ", transliteration: "kxee", category: "Kxa" },
  { character: "ኽ", transliteration: "kxe", category: "Kxa" },
  { character: "ኾ", transliteration: "kxo", category: "Kxa" },
  
  // Wa series
  { character: "ወ", transliteration: "wa", category: "Wa" },
  { character: "ዉ", transliteration: "wu", category: "Wa" },
  { character: "ዊ", transliteration: "wi", category: "Wa" },
  { character: "ዋ", transliteration: "waa", category: "Wa" },
  { character: "ዌ", transliteration: "wee", category: "Wa" },
  { character: "ው", transliteration: "we", category: "Wa" },
  { character: "ዎ", transliteration: "wo", category: "Wa" },
  
  // A (pharyngeal) series
  { character: "ዐ", transliteration: "a", category: "A_pharyngeal" },
  { character: "ዑ", transliteration: "u", category: "A_pharyngeal" },
  { character: "ዒ", transliteration: "i", category: "A_pharyngeal" },
  { character: "ዓ", transliteration: "aa", category: "A_pharyngeal" },
  { character: "ዔ", transliteration: "ee", category: "A_pharyngeal" },
  { character: "ዕ", transliteration: "e", category: "A_pharyngeal" },
  { character: "ዖ", transliteration: "o", category: "A_pharyngeal" },
  
  // Za series
  { character: "ዘ", transliteration: "za", category: "Za" },
  { character: "ዙ", transliteration: "zu", category: "Za" },
  { character: "ዚ", transliteration: "zi", category: "Za" },
  { character: "ዛ", transliteration: "zaa", category: "Za" },
  { character: "ዜ", transliteration: "zee", category: "Za" },
  { character: "ዝ", transliteration: "ze", category: "Za" },
  { character: "ዞ", transliteration: "zo", category: "Za" },
  
  // Zha series
  { character: "ዠ", transliteration: "zha", category: "Zha" },
  { character: "ዡ", transliteration: "zhu", category: "Zha" },
  { character: "ዢ", transliteration: "zhi", category: "Zha" },
  { character: "ዣ", transliteration: "zhaa", category: "Zha" },
  { character: "ዤ", transliteration: "zhee", category: "Zha" },
  { character: "ዥ", transliteration: "zhe", category: "Zha" },
  { character: "ዦ", transliteration: "zho", category: "Zha" },
  
  // Ya series
  { character: "የ", transliteration: "ya", category: "Ya" },
  { character: "ዩ", transliteration: "yu", category: "Ya" },
  { character: "ዪ", transliteration: "yi", category: "Ya" },
  { character: "ያ", transliteration: "yaa", category: "Ya" },
  { character: "ዬ", transliteration: "yee", category: "Ya" },
  { character: "ይ", transliteration: "ye", category: "Ya" },
  { character: "ዮ", transliteration: "yo", category: "Ya" },
  
  // Da series
  { character: "ደ", transliteration: "da", category: "Da" },
  { character: "ዱ", transliteration: "du", category: "Da" },
  { character: "ዲ", transliteration: "di", category: "Da" },
  { character: "ዳ", transliteration: "daa", category: "Da" },
  { character: "ዴ", transliteration: "dee", category: "Da" },
  { character: "ድ", transliteration: "de", category: "Da" },
  { character: "ዶ", transliteration: "do", category: "Da" },
  
  // Dda series
  { character: "ዸ", transliteration: "dda", category: "Dda" },
  { character: "ዹ", transliteration: "ddu", category: "Dda" },
  { character: "ዺ", transliteration: "ddi", category: "Dda" },
  { character: "ዻ", transliteration: "ddaa", category: "Dda" },
  { character: "ዼ", transliteration: "ddee", category: "Dda" },
  { character: "ዽ", transliteration: "dde", category: "Dda" },
  { character: "ዾ", transliteration: "ddo", category: "Dda" },
  
  // Ja series
  { character: "ጀ", transliteration: "ja", category: "Ja" },
  { character: "ጁ", transliteration: "ju", category: "Ja" },
  { character: "ጂ", transliteration: "ji", category: "Ja" },
  { character: "ጃ", transliteration: "jaa", category: "Ja" },
  { character: "ጄ", transliteration: "jee", category: "Ja" },
  { character: "ጅ", transliteration: "je", category: "Ja" },
  { character: "ጆ", transliteration: "jo", category: "Ja" },
  
  // Ga series
  { character: "ገ", transliteration: "ga", category: "Ga" },
  { character: "ጉ", transliteration: "gu", category: "Ga" },
  { character: "ጊ", transliteration: "gi", category: "Ga" },
  { character: "ጋ", transliteration: "gaa", category: "Ga" },
  { character: "ጌ", transliteration: "gee", category: "Ga" },
  { character: "ግ", transliteration: "ge", category: "Ga" },
  { character: "ጎ", transliteration: "go", category: "Ga" },
  
  // Gga series
  { character: "ጘ", transliteration: "gga", category: "Gga" },
  { character: "ጙ", transliteration: "ggu", category: "Gga" },
  { character: "ጚ", transliteration: "ggi", category: "Gga" },
  { character: "ጛ", transliteration: "ggaa", category: "Gga" },
  { character: "ጜ", transliteration: "ggee", category: "Gga" },
  { character: "ጝ", transliteration: "gge", category: "Gga" },
  { character: "ጞ", transliteration: "ggo", category: "Gga" },
  
  // Tha series
  { character: "ጠ", transliteration: "tha", category: "Tha" },
  { character: "ጡ", transliteration: "thu", category: "Tha" },
  { character: "ጢ", transliteration: "thi", category: "Tha" },
  { character: "ጣ", transliteration: "thaa", category: "Tha" },
  { character: "ጤ", transliteration: "thee", category: "Tha" },
  { character: "ጥ", transliteration: "the", category: "Tha" },
  { character: "ጦ", transliteration: "tho", category: "Tha" },
  
  // Cha series
  { character: "ጨ", transliteration: "cha", category: "Cha" },
  { character: "ጩ", transliteration: "chu", category: "Cha" },
  { character: "ጪ", transliteration: "chi", category: "Cha" },
  { character: "ጫ", transliteration: "chaa", category: "Cha" },
  { character: "ጬ", transliteration: "chee", category: "Cha" },
  { character: "ጭ", transliteration: "che", category: "Cha" },
  { character: "ጮ", transliteration: "cho", category: "Cha" },
  
  // Pha series
  { character: "ጰ", transliteration: "pha", category: "Pha" },
  { character: "ጱ", transliteration: "phu", category: "Pha" },
  { character: "ጲ", transliteration: "phi", category: "Pha" },
  { character: "ጳ", transliteration: "phaa", category: "Pha" },
  { character: "ጴ", transliteration: "phee", category: "Pha" },
  { character: "ጵ", transliteration: "phe", category: "Pha" },
  { character: "ጶ", transliteration: "pho", category: "Pha" },
  
  // Tsa series
  { character: "ጸ", transliteration: "tsa", category: "Tsa" },
  { character: "ጹ", transliteration: "tsu", category: "Tsa" },
  { character: "ጺ", transliteration: "tsi", category: "Tsa" },
  { character: "ጻ", transliteration: "tsaa", category: "Tsa" },
  { character: "ጼ", transliteration: "tsee", category: "Tsa" },
  { character: "ጽ", transliteration: "tse", category: "Tsa" },
  { character: "ጾ", transliteration: "tso", category: "Tsa" },
  
  // Tza series
  { character: "ፀ", transliteration: "tza", category: "Tza" },
  { character: "ፁ", transliteration: "tzu", category: "Tza" },
  { character: "ፂ", transliteration: "tzi", category: "Tza" },
  { character: "ፃ", transliteration: "tzaa", category: "Tza" },
  { character: "ፄ", transliteration: "tzee", category: "Tza" },
  { character: "ፅ", transliteration: "tze", category: "Tza" },
  { character: "ፆ", transliteration: "tzo", category: "Tza" },
  
  // Fa series
  { character: "ፈ", transliteration: "fa", category: "Fa" },
  { character: "ፉ", transliteration: "fu", category: "Fa" },
  { character: "ፊ", transliteration: "fi", category: "Fa" },
  { character: "ፋ", transliteration: "faa", category: "Fa" },
  { character: "ፌ", transliteration: "fee", category: "Fa" },
  { character: "ፍ", transliteration: "fe", category: "Fa" },
  { character: "ፎ", transliteration: "fo", category: "Fa" },
  
  // Pa series
  { character: "ፐ", transliteration: "pa", category: "Pa" },
  { character: "ፑ", transliteration: "pu", category: "Pa" },
  { character: "ፒ", transliteration: "pi", category: "Pa" },
  { character: "ፓ", transliteration: "paa", category: "Pa" },
  { character: "ፔ", transliteration: "pee", category: "Pa" },
  { character: "ፕ", transliteration: "pe", category: "Pa" },
  { character: "ፖ", transliteration: "po", category: "Pa" },
]

export default function AmharicAlphabet() {
  const [copiedChar, setCopiedChar] = useState<string | null>(null)

  const handleCopy = async (char: string) => {
    try {
      await navigator.clipboard.writeText(char)
      setCopiedChar(char)
      setTimeout(() => setCopiedChar(null), 1000)
    } catch (error) {
      console.error('Failed to copy character:', error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-white text-center">
            Amharic Alphabet
          </h1>
          <p className="text-blue-100 text-center mt-1 text-sm sm:text-base">
            Complete Amharic alphabet with transliterations - Click any letter to copy
          </p>
        </div>

        <div className="p-4 sm:p-2">
          {/* Description */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Amharic / Ethiopian Alphabet</h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              In the Amharic or Ethiopian alphabet, letters are organised in a grid system where consonants appear vertically and their vowel-added variants, horizontally. The grid below shows the Amharic alphabet with english intonation and pronunciations. It offers a simple and quick way of understanding Amharic and getting to comprehend it for the purpose of proper articulation of the language.
            </p>
          </div>

          {/* Alphabet Grid */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-7">
              {amharicAlphabet.map((char, index) => (
                <div
                  key={index}
                  className="border border-gray-200 p-2 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleCopy(char.character)}
                  title={`${char.character} (${char.transliteration})`}
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2" style={{ color: '#707070' }}>
                    {char.character}
                  </div>
                  <div className="text-sm text-gray-500">
                    {char.transliteration}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="mt-6 text-center text-gray-600">
            <p className="text-sm sm:text-base">
              {copiedChar ? (
                <span className="text-green-600 font-medium">✓ Copied {copiedChar} to clipboard!</span>
              ) : (
                "Click on any letter to copy it to clipboard"
              )}
            </p>
            <p className="text-xs sm:text-sm mt-2 text-gray-500">Total: {amharicAlphabet.length} letters</p>
          </div>
        </div>
      </div>
    </div>
  )
} 