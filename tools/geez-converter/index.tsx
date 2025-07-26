'use client';

import { useState } from 'react';
import { BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';

export default function GeezConverter() {
  const [arabicInput, setArabicInput] = useState('');
  const [geezInput, setGeezInput] = useState('');
  const [arabicToGeez, setArabicToGeez] = useState('');
  const [geezToArabic, setGeezToArabic] = useState('');

  // Geez number mapping
  const arabicToGeezMap: { [key: string]: string } = {
    '0': '፲', '1': '፩', '2': '፪', '3': '፫', '4': '፬', '5': '፭',
    '6': '፮', '7': '፯', '8': '፰', '9': '፱'
  };

  const geezToArabicMap: { [key: string]: string } = {
    '፲': '0', '፩': '1', '፪': '2', '፫': '3', '፬': '4', '፭': '5',
    '፮': '6', '፯': '7', '፰': '8', '፱': '9'
  };

  const convertArabicToGeez = (number: string) => {
    if (!number) return '';
    
    // Remove any non-digit characters
    const cleanNumber = number.replace(/\D/g, '');
    
    if (!cleanNumber) return '';
    
    // Convert each digit to Geez
    return cleanNumber.split('').map(digit => 
      arabicToGeezMap[digit] || digit
    ).join('');
  };

  const convertGeezToArabic = (geez: string) => {
    if (!geez) return '';
    
    // Convert each Geez character to Arabic
    return geez.split('').map(char => 
      geezToArabicMap[char] || char
    ).join('');
  };

  const handleArabicInputChange = (value: string) => {
    setArabicInput(value);
    const result = convertArabicToGeez(value);
    setArabicToGeez(result);
  };

  const handleGeezInputChange = (value: string) => {
    setGeezInput(value);
    const result = convertGeezToArabic(value);
    setGeezToArabic(result);
  };

  const clearAll = () => {
    setArabicInput('');
    setGeezInput('');
    setArabicToGeez('');
    setGeezToArabic('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-red-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Geez Number Converter</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Convert between Arabic numerals and traditional Geez number system used in Ethiopian manuscripts.
            Geez numbers are written from left to right, just like Arabic numerals.
          </p>
        </div>

        {/* Conversion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Arabic to Geez */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Arabic to Geez</h3>
              <div className="flex items-center justify-center text-gray-500">
                <span className="text-sm">Arabic Numerals</span>
                <ArrowRight className="w-4 h-4 mx-2" />
                <span className="text-sm">Geez Numbers</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Arabic Number
              </label>
              <input
                type="text"
                value={arabicInput}
                onChange={(e) => handleArabicInputChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                placeholder="Enter Arabic number (e.g., 123)"
              />
            </div>
            
            {arabicToGeez && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Geez Number
                </label>
                <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-lg font-geez">
                  {arabicToGeez}
                </div>
              </div>
            )}
          </div>

          {/* Geez to Arabic */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Geez to Arabic</h3>
              <div className="flex items-center justify-center text-gray-500">
                <span className="text-sm">Geez Numbers</span>
                <ArrowLeft className="w-4 h-4 mx-2" />
                <span className="text-sm">Arabic Numerals</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Geez Number
              </label>
              <input
                type="text"
                value={geezInput}
                onChange={(e) => handleGeezInputChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg font-geez"
                placeholder="Enter Geez number (e.g., ፩፪፫)"
              />
            </div>
            
            {geezToArabic && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Arabic Number
                </label>
                <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-lg">
                  {geezToArabic}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Examples */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Arabic to Geez:</h4>
              <div className="space-y-1 text-sm">
                <div>123 → ፩፪፫</div>
                <div>456 → ፬፭፮</div>
                <div>789 → ፯፰፱</div>
                <div>1000 → ፩፲፲፲</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Geez to Arabic:</h4>
              <div className="space-y-1 text-sm">
                <div>፩፪፫ → 123</div>
                <div>፬፭፮ → 456</div>
                <div>፯፰፱ → 789</div>
                <div>፩፲፲፲ → 1000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Clear Button */}
        <div className="mt-6 text-center">
          <button
            onClick={clearAll}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
} 