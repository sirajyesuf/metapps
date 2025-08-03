"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Check } from "lucide-react"

// Ge'ez numeral mappings
const geezDigits = {
  1: '፩', 2: '፪', 3: '፫', 4: '፬', 5: '፭',
  6: '፮', 7: '፯', 8: '፰', 9: '፱'
}

const geezTens = {
  1: '፲', 2: '፳', 3: '፴', 4: '፵', 5: '፶',
  6: '፷', 7: '፸', 8: '፹', 9: '፺'
}

const geezHundreds = '፻'
const geezThousands = '፼'

function convertGroup(num: number): string {
  if (num === 0) return ''
  
  const thousands = Math.floor(num / 1000)
  const hundreds = Math.floor((num % 1000) / 100)
  const tens = Math.floor((num % 100) / 10)
  const units = num % 10
  
  let result = ''
  
  if (thousands > 0) {
    if (thousands > 1) result += geezDigits[thousands as keyof typeof geezDigits]
    result += geezThousands
  }
  
  if (hundreds > 0) {
    if (hundreds > 1) result += geezDigits[hundreds as keyof typeof geezDigits]
    result += geezHundreds
  }
  
  if (tens > 0) {
    result += geezTens[tens as keyof typeof geezTens]
  }
  
  if (units > 0) {
    result += geezDigits[units as keyof typeof geezDigits]
  }
  
  return result
}

function convertToGeez(input: string): string {
  // Input validation
  if (!/^\d+$/.test(input)) {
    return 'Please enter a non-negative integer'
  }

  // Convert to number, remove leading zeros
  const num = BigInt(input)
  if (num === BigInt(0)) {
    return 'No Ge\'ez symbol for 0'
  }

  // Process number in groups of thousands
  let numStr = num.toString()
  let groups: string[] = []
  
  while (numStr.length > 0) {
    groups.unshift(numStr.slice(-4))
    numStr = numStr.slice(0, -4)
  }

  let result = ''
  for (let i = 0; i < groups.length; i++) {
    const groupValue = parseInt(groups[i])
    if (groupValue === 0) continue
    
    const groupResult = convertGroup(groupValue)
    if (groupResult) {
      result += groupResult
      // Add ፼ for all but the last group
      if (i < groups.length - 1) {
        for (let j = 0; j < groups.length - 1 - i; j++) {
          result += geezThousands
        }
      }
    }
  }

  return result || 'No result'
}

export default function ArabicGeezConverter() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const handleConvert = () => {
    setError("")
    const converted = convertToGeez(input)
    
    if (converted.includes('Please enter') || converted.includes('No Ge\'ez symbol')) {
      setError(converted)
      setResult("")
    } else {
      setResult(converted)
    }
  }

  const handleClear = () => {
    setInput("")
    setResult("")
    setError("")
    setCopied(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy result:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-white text-center">
            Arabic to Ge'ez Numeral Converter
          </h1>
          <p className="text-blue-100 text-center mt-1 text-sm sm:text-base">
            Convert Arabic numerals to traditional Ethiopian Ge'ez numerals
          </p>
        </div>

        <div className="p-4 sm:p-6">
          {/* Converter Section */}
          <div className="mb-6">
            <label htmlFor="arabicInput" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Arabic Numeral:
            </label>
            <Input
              type="text"
              id="arabicInput"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 1234567033"
              className="w-full p-3 text-lg border-2 border-gray-200 focus:border-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Button
              onClick={handleConvert}
              disabled={!input.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200"
            >
              Convert
            </Button>
            <Button
              onClick={handleClear}
              disabled={!input.trim() && !result}
              variant="outline"
              className="px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              Clear
            </Button>
          </div>

          {/* Result Section */}
          {result && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">Ge'ez Numeral:</h3>
                <Button
                  onClick={handleCopy}
                  className={`flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                    copied 
                      ? 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-200' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
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
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-center p-4 bg-white rounded border" style={{ fontFamily: 'Noto Sans Ethiopic, Arial, sans-serif' }}>
                {result}
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}

          {/* Explanation Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">How It Works</h2>
            <div className="text-gray-700 text-sm space-y-3">
              <p>
                The Amharic Ge'ez numeral system uses unique symbols to represent numbers. Unlike Arabic numerals (0-9), 
                Ge'ez numerals combine symbols for units, tens, hundreds, and thousands to form any number. There is no symbol for zero.
              </p>
              
              <div>
                <p className="font-semibold mb-2">Key Symbols:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Units (1-9): ፩ (1), ፪ (2), ፫ (3), ፬ (4), ፭ (5), ፮ (6), ፯ (7), ፰ (8), ፱ (9)</li>
                  <li>Tens (10-90): ፲ (10), ፳ (20), ፴ (30), ፵ (40), ፶ (50), ፷ (60), ፸ (70), ፹ (80), ፺ (90)</li>
                  <li>Hundreds: ፻ (100)</li>
                  <li>Thousands: ፼ (10,000)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Conversion Process:</p>
                <p className="mb-2">Numbers are grouped into sets of thousands, with each group converted to Ge'ez symbols. For large numbers, the ፼ symbol is used multiple times.</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Enter an Arabic numeral (e.g., 1234567033).</li>
                  <li>Break it into groups of thousands: 1 (billion), 2345 (thousands), 6703 (thousands), 33.</li>
                  <li>Convert each group:
                    <ul className="list-disc pl-5 mt-1">
                      <li>1,000,000,000 = ፩ + two ፼ = ፩፼፼</li>
                      <li>2,345,000 = ፪፻፴፬ + one ፼ = ፪፻፴፬፼</li>
                      <li>670,300 = ፶፻፷፯፻</li>
                      <li>33 = ፴፫</li>
                    </ul>
                  </li>
                  <li>Combine symbols left-to-right: ፩፼፼፪፻፴፬፼፶፻፷፯፻፴፫.</li>
                </ol>
              </div>

              <div>
                <p className="font-semibold mb-2">Example:</p>
                <p className="mb-2">For 1234567033:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>1,000,000,000 = ፩፼፼</li>
                  <li>2,345,000 = ፪፻፴፬፼</li>
                  <li>670,300 = ፶፻፷፯፻</li>
                  <li>33 = ፴፫</li>
                  <li>Result: ፩፼፼፪፻፴፬፼፶፻፷፯፻፴፫</li>
                </ul>
              </div>

              <p className="text-center font-medium">
                Enter any number above and click "Convert" to see the Ge'ez numeral!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 