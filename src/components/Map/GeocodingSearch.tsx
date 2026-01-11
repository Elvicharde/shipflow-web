import React, { useState } from 'react';

const GeocodingSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query) return;

        setLoading(true);
        try {
            const response = await fetch(`https://api.example.com/geocode?address=${encodeURIComponent(query)}`);
            const data = await response.json();
            setResults(data.results);
        } catch (error) {
            console.error('Error fetching geocoding data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter address"
            />
            <button onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </button>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result.formatted_address}</li>
                ))}
            </ul>
        </div>
    );
};

export default GeocodingSearch;