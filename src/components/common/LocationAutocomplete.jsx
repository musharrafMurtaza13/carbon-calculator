import { useState, useEffect } from 'react';
import { MapPin, Loader } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function LocationAutocomplete({
    label,
    placeholder,
    value,
    onChange,
    onSelect,
    error,
    touched,
    required = false,
}) {
    const { darkMode } = useTheme();
    const [inputValue, setInputValue] = useState(value || '');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Fetch locations from API
    useEffect(() => {
        if (inputValue.length < 2) {
            setSuggestions([]);
            return;
        }

        const fetchLocations = async () => {
            setLoading(true);
            try {
                // Using Open-Meteo Geocoding API (free, no auth required)
                const response = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${inputValue}&count=10&language=en`
                );
                const data = await response.json();
                debugger;
                console.log('data', data);
                if (data.results) {
                    const formatted = data.results.map((loc) => ({
                        name: loc.name,
                        country: loc.country,
                        countryCode: loc.country_code,
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                        type: loc.admin1 || 'City',
                        code: loc.country_code,
                    }));
                    setSuggestions(formatted);
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(fetchLocations, 500); // Debounce
        return () => clearTimeout(timer);
    }, [inputValue]);

    const handleInputChange = (e) => {
        const val = e.target.value;
        setInputValue(val);
        onChange?.(val);
        setShowSuggestions(true);
    };

    const handleSelectLocation = (location) => {
        const displayText = `${location.name}, ${location.country}`;
        setInputValue(displayText);
        onChange?.(displayText);
        onSelect?.(location);
        setShowSuggestions(false);
        setSuggestions([]);
    };

    return (
        <div className="relative">
            {label && (
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    {label}
                    {required && <span className="text-red-500"> *</span>}
                </label>
            )}

            <div className="relative flex items-center">
                <MapPin className={`absolute left-3 pointer-events-none ${darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} size={20} />

                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder={placeholder}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                        } ${error && touched ? 'border-red-500' : ''}`}
                />

                {loading && (
                    <Loader className="absolute right-3 animate-spin text-blue-500" size={20} />
                )}
            </div>

            {error && touched && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className={`absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}>
                    {suggestions.map((location, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleSelectLocation(location)}
                            className={`w-full text-left px-4 py-3 border-b transition flex items-center justify-between hover:bg-blue-50 ${darkMode
                                ? 'border-gray-600 hover:bg-gray-600 text-gray-100'
                                : 'border-gray-200 text-gray-900'
                                }`}
                        >
                            <div className="flex-1">
                                <p className="font-medium">{location.name}</p>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {location.country} • {location.type}
                                </p>
                            </div>
                            <div className="ml-2 text-lg">
                                {location.countryCode === 'PK' && '🇵🇰'}
                                {location.countryCode === 'US' && '🇺🇸'}
                                {location.countryCode === 'GB' && '🇬🇧'}
                                {location.countryCode === 'CN' && '🇨🇳'}
                                {location.countryCode === 'IN' && '🇮🇳'}
                                {location.countryCode === 'TR' && '🇹🇷'}
                                {!['PK', 'US', 'GB', 'CN', 'IN', 'TR'].includes(location.countryCode) && '🌍'}
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {showSuggestions && inputValue.length >= 2 && !loading && suggestions.length === 0 && (
                <div className={`absolute top-full left-0 right-0 mt-1 p-4 rounded-lg shadow-lg z-50 text-center ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-500'
                    }`}>
                    No locations found
                </div>
            )}
        </div>
    );
}