"use client"

import React, { useState, useEffect } from 'react';
import { Clock, Plus, X, Globe, Calendar, Search } from 'lucide-react';

interface TimeZone {
  id: string;
  name: string;
  abbreviation: string;
  offset: string;
  country: string;
}

const POPULAR_TIMEZONES: TimeZone[] = [
  { id: 'America/New_York', name: 'New York', abbreviation: 'EST/EDT', offset: 'UTC-5/-4', country: 'United States' },
  { id: 'America/Los_Angeles', name: 'Los Angeles', abbreviation: 'PST/PDT', offset: 'UTC-8/-7', country: 'United States' },
  { id: 'Europe/London', name: 'London', abbreviation: 'GMT/BST', offset: 'UTC+0/+1', country: 'United Kingdom' },
  { id: 'Europe/Paris', name: 'Paris', abbreviation: 'CET/CEST', offset: 'UTC+1/+2', country: 'France' },
  { id: 'Asia/Tokyo', name: 'Tokyo', abbreviation: 'JST', offset: 'UTC+9', country: 'Japan' },
  { id: 'Asia/Shanghai', name: 'Shanghai', abbreviation: 'CST', offset: 'UTC+8', country: 'China' },
  { id: 'Asia/Dubai', name: 'Dubai', abbreviation: 'GST', offset: 'UTC+4', country: 'United Arab Emirates' },
  { id: 'Australia/Sydney', name: 'Sydney', abbreviation: 'AEDT/AEST', offset: 'UTC+11/+10', country: 'Australia' },
  { id: 'Asia/Singapore', name: 'Singapore', abbreviation: 'SGT', offset: 'UTC+8', country: 'Singapore' },
  { id: 'Europe/Berlin', name: 'Berlin', abbreviation: 'CET/CEST', offset: 'UTC+1/+2', country: 'Germany' },
  { id: 'Asia/Kolkata', name: 'Mumbai', abbreviation: 'IST', offset: 'UTC+5:30', country: 'India' },
  { id: 'America/Chicago', name: 'Chicago', abbreviation: 'CST/CDT', offset: 'UTC-6/-5', country: 'United States' },
  { id: 'America/Denver', name: 'Denver', abbreviation: 'MDT', offset: 'UTC-6', country: 'United States' },
  { id: 'Europe/Rome', name: 'Rome', abbreviation: 'CEST', offset: 'UTC+2', country: 'Italy' },
  { id: 'Europe/Moscow', name: 'Moscow', abbreviation: 'MSK', offset: 'UTC+3', country: 'Russia' },
  { id: 'Asia/Seoul', name: 'Seoul', abbreviation: 'KST', offset: 'UTC+9', country: 'South Korea' },
  { id: 'Australia/Melbourne', name: 'Melbourne', abbreviation: 'AEST', offset: 'UTC+10', country: 'Australia' },
  { id: 'Pacific/Auckland', name: 'Auckland', abbreviation: 'NZST', offset: 'UTC+12', country: 'New Zealand' },
  { id: 'Africa/Cairo', name: 'Cairo', abbreviation: 'EET', offset: 'UTC+2', country: 'Egypt' },
  { id: 'Africa/Johannesburg', name: 'Johannesburg', abbreviation: 'SAST', offset: 'UTC+2', country: 'South Africa' },
  { id: 'Africa/Lagos', name: 'Lagos', abbreviation: 'WAT', offset: 'UTC+1', country: 'Nigeria' },
  { id: 'Asia/Bangkok', name: 'Bangkok', abbreviation: 'ICT', offset: 'UTC+7', country: 'Thailand' },
  { id: 'Asia/Hong_Kong', name: 'Hong Kong', abbreviation: 'HKT', offset: 'UTC+8', country: 'China' },
  { id: 'Asia/Manila', name: 'Manila', abbreviation: 'PHT', offset: 'UTC+8', country: 'Philippines' },
  { id: 'America/Toronto', name: 'Toronto', abbreviation: 'EDT', offset: 'UTC-4', country: 'Canada' },
  { id: 'America/Vancouver', name: 'Vancouver', abbreviation: 'PDT', offset: 'UTC-7', country: 'Canada' },
  { id: 'America/Sao_Paulo', name: 'São Paulo', abbreviation: 'BRT', offset: 'UTC-3', country: 'Brazil' },
  { id: 'America/Mexico_City', name: 'Mexico City', abbreviation: 'CDT', offset: 'UTC-5', country: 'Mexico' },
  { id: 'America/Argentina/Buenos_Aires', name: 'Buenos Aires', abbreviation: 'ART', offset: 'UTC-3', country: 'Argentina' },
  { id: 'America/Santiago', name: 'Santiago', abbreviation: 'CLT', offset: 'UTC-3', country: 'Chile' },
  { id: 'Pacific/Honolulu', name: 'Honolulu', abbreviation: 'HST', offset: 'UTC-10', country: 'United States' },
  { id: 'Europe/Istanbul', name: 'Istanbul', abbreviation: 'TRT', offset: 'UTC+3', country: 'Turkey' },
  { id: 'Asia/Tehran', name: 'Tehran', abbreviation: 'IRST', offset: 'UTC+3:30', country: 'Iran' },
  { id: 'Asia/Karachi', name: 'Karachi', abbreviation: 'PKT', offset: 'UTC+5', country: 'Pakistan' },
  { id: 'Asia/Dhaka', name: 'Dhaka', abbreviation: 'BST', offset: 'UTC+6', country: 'Bangladesh' },
  { id: 'Asia/Yangon', name: 'Yangon', abbreviation: 'MMT', offset: 'UTC+6:30', country: 'Myanmar' },
  { id: 'Asia/Ho_Chi_Minh', name: 'Ho Chi Minh City', abbreviation: 'ICT', offset: 'UTC+7', country: 'Vietnam' },
  { id: 'Asia/Jakarta', name: 'Jakarta', abbreviation: 'WIB', offset: 'UTC+7', country: 'Indonesia' },
  { id: 'Asia/Kuala_Lumpur', name: 'Kuala Lumpur', abbreviation: 'MYT', offset: 'UTC+8', country: 'Malaysia' },
  { id: 'Asia/Taipei', name: 'Taipei', abbreviation: 'CST', offset: 'UTC+8', country: 'Taiwan' },
];

export default function TimezoneConverter() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimezones, setSelectedTimezones] = useState<TimeZone[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [is24Hour, setIs24Hour] = useState(true);

  const baseTimezone: TimeZone = {
    id: 'Africa/Addis_Ababa',
    name: 'Addis Ababa',
    abbreviation: 'EAT',
    offset: 'UTC+3',
    country: 'Ethiopia'
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date, timezoneId: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezoneId,
      hour: '2-digit',
      minute: '2-digit',
      hour12: !is24Hour
    }).format(date);
  };

  const formatDate = (date: Date, timezoneId: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezoneId,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getCurrentHour = (timezoneId: string) => {
    const date = new Date();
    const hour = new Intl.DateTimeFormat('en-US', {
      timeZone: timezoneId,
      hour: '2-digit',
      hour12: false
    }).format(date);
    return parseInt(hour);
  };

  const addTimezone = (timezone: TimeZone) => {
    if (!selectedTimezones.find(tz => tz.id === timezone.id)) {
      setSelectedTimezones([...selectedTimezones, timezone]);
    }
    setShowDropdown(false);
    setSearchTerm('');
  };

  const removeTimezone = (timezoneId: string) => {
    setSelectedTimezones(selectedTimezones.filter(tz => tz.id !== timezoneId));
  };

  const filteredTimezones = POPULAR_TIMEZONES.filter(tz =>
    tz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tz.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tz.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 0; i < 24; i++) {
      slots.push(i);
    }
    return slots;
  };

  const getTimeForHour = (hour: number, timezoneId: string) => {
    const baseDate = new Date(selectedDate);
    baseDate.setHours(hour, 0, 0, 0);
    
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezoneId,
      hour: '2-digit',
      minute: '2-digit',
      hour12: !is24Hour
    }).format(baseDate);
  };

  const formatDateInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const allTimezones = [baseTimezone, ...selectedTimezones];
  const timeSlots = generateTimeSlots();

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-center mb-2">
            <Globe className="w-8 h-8 text-white mr-3" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              TimeZone Converter
            </h1>
          </div>
          <p className="text-blue-100 text-center text-sm sm:text-base">
            Convert from Addis Ababa to any time zone worldwide
          </p>
        </div>

        <div className="p-4 sm:p-6">

          {/* Current Time Display */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6 text-center">
            <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">
              {formatTime(currentTime, baseTimezone.id)}
            </div>
            <div className="text-lg text-gray-600">
              {formatDate(currentTime, baseTimezone.id)} • {baseTimezone.name}, {baseTimezone.country}
            </div>
          </div>

          {/* Controls Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6 p-4 bg-gray-50 rounded-lg">
            {/* Date Picker */}
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-600" />
              <input
                type="date"
                value={formatDateInput(selectedDate)}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Add Timezone Button */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Time Zone
              </button>

              {showDropdown && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search time zones..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {filteredTimezones.map((timezone) => (
                      <button
                        key={timezone.id}
                        onClick={() => addTimezone(timezone)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                        disabled={selectedTimezones.some(tz => tz.id === timezone.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-gray-900">{timezone.name}</div>
                            <div className="text-sm text-gray-600">
                              {timezone.abbreviation} • {timezone.offset} • {timezone.country}
                            </div>
                          </div>
                          <div className="text-sm font-mono text-blue-600">
                            {formatTime(currentTime, timezone.id)}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Time Format Toggle */}
            <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setIs24Hour(true)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                  is24Hour
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                24
              </button>
              <button
                onClick={() => setIs24Hour(false)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                  !is24Hour
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                12
              </button>
            </div>
          </div>

          {/* Timeline Grid */}
          {allTimezones.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">{is24Hour ? '24-Hour' : '12-Hour'} Timeline</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Compare times across different zones (current hour highlighted)
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <div className="min-w-max">
                  {/* Header Row */}
                  <div className="flex border-b border-gray-200 bg-gray-50">
                    <div className="w-48 px-4 py-3 text-left text-xs font-medium text-gray-600 border-r border-gray-200">
                      Time Zone
                    </div>
                    {timeSlots.map((hour) => (
                      <div
                        key={hour}
                        className={`w-20 px-2 py-3 text-center text-xs font-medium border-r border-gray-200 last:border-r-0 ${
                          hour === getCurrentHour(baseTimezone.id)
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600'
                        }`}
                      >
                        {is24Hour 
                          ? `${hour.toString().padStart(2, '0')}:00`
                          : `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}${hour < 12 ? 'AM' : 'PM'}`
                        }
                      </div>
                    ))}
                  </div>

                  {/* Time Zone Rows */}
                  {allTimezones.map((timezone, tzIndex) => (
                    <div key={timezone.id} className="flex border-b border-gray-200 last:border-b-0">
                      {/* Timezone Column */}
                      <div className="w-48 px-4 py-3 border-r border-gray-200 bg-gray-50 flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{timezone.name}</div>
                          <div className="text-xs text-gray-600">{timezone.abbreviation} • {timezone.country}</div>
                        </div>
                        {tzIndex > 0 && (
                          <button
                            onClick={() => removeTimezone(timezone.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200 ml-2"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      {/* Time Slots Row */}
                      {timeSlots.map((hour) => {
                        const isCurrentHour = Math.abs(hour - getCurrentHour(baseTimezone.id)) < 1;
                        
                        return (
                          <div
                            key={`${timezone.id}-${hour}`}
                            className={`w-20 px-2 py-3 text-center text-xs font-mono border-r border-gray-200 last:border-r-0 ${
                              isCurrentHour
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-600'
                            } ${tzIndex % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}
                          >
                            {getTimeForHour(hour, timezone.id)}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTimezones.length === 0 && (
            <div className="text-center py-12">
              <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Add time zones to compare</h3>
              <p className="text-gray-600 mb-4">
                Click "Add Time Zone" to compare Addis Ababa time with other locations
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 