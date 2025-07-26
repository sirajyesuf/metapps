"use client";
import { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { caramhConvert } from "./js/caramh_converter";

// Amharic base letters and their forms (syllabary)
const amharicSyllabary = [
  { base: "ሀ", forms: ["ሀ", "ሁ", "ሂ", "ሃ", "ሄ", "ህ", "ሆ", "ሇ"] },
  { base: "ለ", forms: ["ለ", "ሉ", "ሊ", "ላ", "ሌ", "ል", "ሎ", "ሏ"] },
  { base: "መ", forms: ["መ", "ሙ", "ሚ", "ማ", "ሜ", "ም", "ሞ", "ሟ"] },
  { base: "ሠ", forms: ["ሠ", "ሡ", "ሢ", "ሣ", "ሤ", "ሥ", "ሦ", "ሧ"] },
  { base: "ረ", forms: ["ረ", "ሩ", "ሪ", "ራ", "ሬ", "ር", "ሮ", "ሯ"] },
  { base: "ሰ", forms: ["ሰ", "ሱ", "ሲ", "ሳ", "ሴ", "ስ", "ሶ", "ሷ"] },
  { base: "ሸ", forms: ["ሸ", "ሹ", "ሺ", "ሻ", "ሼ", "ሽ", "ሾ", "ሿ"] },
  { base: "ቀ", forms: ["ቀ", "ቁ", "ቂ", "ቃ", "ቄ", "ቅ", "ቆ", "ቇ"] },
  { base: "በ", forms: ["በ", "ቡ", "ቢ", "ባ", "ቤ", "ብ", "ቦ", "ቧ"] },
  { base: "ቨ", forms: ["ቨ", "ቩ", "ቪ", "ቫ", "ቬ", "ቭ", "ቮ", "ቯ"] },
  { base: "ተ", forms: ["ተ", "ቱ", "ቲ", "ታ", "ቴ", "ት", "ቶ", "ቷ"] },
  { base: "ቸ", forms: ["ቸ", "ቹ", "ቺ", "ቻ", "ቼ", "ች", "ቾ", "ቿ"] },
  { base: "ኀ", forms: ["ኀ", "ኁ", "ኂ", "ኃ", "ኄ", "ኅ", "ኆ", "ኇ"] },
  { base: "ነ", forms: ["ነ", "ኑ", "ኒ", "ና", "ኔ", "ን", "ኖ", "ኗ"] },
  { base: "ኘ", forms: ["ኘ", "ኙ", "ኚ", "ኛ", "ኜ", "ኝ", "ኞ", "ኟ"] },
  { base: "አ", forms: ["አ", "ኡ", "ኢ", "ኣ", "ኤ", "እ", "ኦ", "ኧ"] },
  { base: "ከ", forms: ["ከ", "ኩ", "ኪ", "ካ", "ኬ", "ክ", "ኮ", "ኯ"] },
  { base: "ኸ", forms: ["ኸ", "ኹ", "ኺ", "ኻ", "ኼ", "ኽ", "ኾ", "኿"] },
  { base: "ወ", forms: ["ወ", "ዉ", "ዊ", "ዋ", "ዌ", "ው", "ዎ", "ዏ"] },
  { base: "ዐ", forms: ["ዐ", "ዑ", "ዒ", "ዓ", "ዔ", "ዕ", "ዖ", "዗"] },
  { base: "ዘ", forms: ["ዘ", "ዙ", "ዚ", "ዛ", "ዜ", "ዝ", "ዞ", "ዟ"] },
  { base: "ዠ", forms: ["ዠ", "ዡ", "ዢ", "ዣ", "ዤ", "ዥ", "ዦ", "ዧ"] },
  { base: "የ", forms: ["የ", "ዩ", "ዪ", "ያ", "ዬ", "ይ", "ዮ", "ዯ"] },
  { base: "ደ", forms: ["ደ", "ዱ", "ዲ", "ዳ", "ዴ", "ድ", "ዶ", "ዷ"] },
  { base: "ጀ", forms: ["ጀ", "ጁ", "ጂ", "ጃ", "ጄ", "ጅ", "ጆ", "ጇ"] },
  { base: "ገ", forms: ["ገ", "ጉ", "ጊ", "ጋ", "ጌ", "ግ", "ጎ", "ጏ"] },
  { base: "ጠ", forms: ["ጠ", "ጡ", "ጢ", "ጣ", "ጤ", "ጥ", "ጦ", "ጧ"] },
  { base: "ጨ", forms: ["ጨ", "ጩ", "ጪ", "ጫ", "ጬ", "ጭ", "ጮ", "ጯ"] },
  { base: "ጰ", forms: ["ጰ", "ጱ", "ጲ", "ጳ", "ጴ", "ጵ", "ጶ", "ጷ"] },
  { base: "ጸ", forms: ["ጸ", "ጹ", "ጺ", "ጻ", "ጼ", "ጽ", "ጾ", "ጿ"] },
  { base: "ፀ", forms: ["ፀ", "ፁ", "ፂ", "ፃ", "ፄ", "ፅ", "ፆ", "ፇ"] },
  { base: "ፈ", forms: ["ፈ", "ፉ", "ፊ", "ፋ", "ፌ", "ፍ", "ፎ", "ፏ"] },
  { base: "ፐ", forms: ["ፐ", "ፑ", "ፒ", "ፓ", "ፔ", "ፕ", "ፖ", "ፗ"] },
];

// Numbers and punctuation row (QWERTY top row style)
const numbersAndPunctuation = [
  { label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }, { label: "5", value: "5" },
  { label: "6", value: "6" }, { label: "7", value: "7" }, { label: "8", value: "8" }, { label: "9", value: "9" }, { label: "0", value: "0" },
  { label: "-", value: "-" }, { label: "=", value: "=" },
  { label: "፩", value: "፩" }, { label: "፪", value: "፪" }, { label: "፫", value: "፫" }, { label: "፬", value: "፬" }, { label: "፭", value: "፭" },
  { label: "፮", value: "፮" }, { label: "፯", value: "፯" }, { label: "፰", value: "፰" }, { label: "፱", value: "፱" }, { label: "፲", value: "፲" },
  { label: "፣", value: "፣" }, { label: "።", value: "።" }, { label: "፤", value: "፤" }, { label: "፥", value: "፥" }, { label: "፧", value: "፧" }, { label: "፨", value: "፨" }
];

export default function AmharicKeyboard() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeBase, setActiveBase] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const input = e.currentTarget.value;
    const converted = caramhConvert(input);
    setText(converted);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const handleClear = () => {
    setText("");
    textareaRef.current?.focus();
  };

  const insertCharacter = (char: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = text.substring(0, start) + char + text.substring(end);
    setText(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + char.length, start + char.length);
    }, 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-white text-center">
            Amharic Syllabary Keyboard አማርኛ ኪቦርድ
          </h1>
          <p className="text-blue-100 text-center mt-1 text-sm sm:text-base">
            Click a base letter to see all its forms, then click a form to insert it
          </p>
        </div>
        <div className="p-4 sm:p-6">
          {/* Text Area */}
          <div className="relative mb-6">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyUp={handleKeyUp}
              placeholder="Type or use the keyboard below..."
              className="w-full h-32 sm:h-40 p-4 sm:p-6 border-2 border-gray-200 rounded-lg resize-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-base sm:text-lg leading-relaxed font-geez"
              style={{ fontFamily: 'Noto Sans Ethiopic, Arial, sans-serif' }}
            />
            <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-xs sm:text-sm text-gray-500 bg-white/80 px-2 py-1 rounded">
              {text.length} characters
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCopy}
                disabled={!text}
                className={`flex items-center px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                  copied 
                    ? 'bg-green-100 text-green-700 border border-green-300' 
                    : text 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Text
                  </>
                )}
              </button>
              <button
                onClick={handleClear}
                disabled={!text}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                  text 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-300' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Clear
              </button>
            </div>
          </div>
          {/* Forms Area (below action buttons) */}
          {activeBase !== null && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {amharicSyllabary[activeBase].forms.map((form, j) => (
                <button
                  key={j}
                  type="button"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-200 text-lg sm:text-xl font-geez"
                  onClick={() => {
                    insertCharacter(form);
                    // Do NOT close the forms area here
                  }}
                >
                  {form}
                </button>
              ))}
            </div>
          )}
          {/* Syllabary Keyboard */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-6">
            {/* Numbers and Punctuation Row */}
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-3">
              {numbersAndPunctuation.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-sm sm:text-base font-geez"
                  onClick={() => insertCharacter(item.value)}
                  title={item.label}
                >
                  {item.value}
                </button>
              ))}
            </div>
            {/* Amharic Syllabary Grid */}
            <div className="grid grid-cols-6 sm:grid-cols-9 gap-1 sm:gap-2">
              {amharicSyllabary.map((syll, i) => (
                <div key={i} className="relative">
                  <button
                    type="button"
                    className={`w-10 h-10 sm:w-12 sm:h-12 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-lg sm:text-xl font-geez focus:z-20 ${activeBase === i ? 'ring-2 ring-blue-400' : ''}`}
                    onClick={() => setActiveBase(activeBase === i ? null : i)}
                  >
                    {syll.base}
                  </button>
                </div>
              ))}
            </div>
          </div>
      
        </div>
      </div>
    </div>
  );
} 