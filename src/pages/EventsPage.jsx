import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import eventService from '../api/eventService';
import EventCard from '../components/EventCard';
import { FiSearch, FiX } from 'react-icons/fi';

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    
    // Get current filter from URL or default to 'all'
    const currentFilter = searchParams.get('dateFilter') || 'all';

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);
            try {
                // Create a params object from the URL search params
                const params = Object.fromEntries(searchParams.entries());
                
                // Remove 'all' filter since backend should show all events when no dateFilter is provided
                if (params.dateFilter === 'all') {
                    delete params.dateFilter;
                }
                
                const data = await eventService.getEvents(params);
                setEvents(data);
            } catch (err) {
                console.error("Failed to fetch events", err);
                setError('Failed to fetch events. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            setSearchParams(prev => {
                prev.set('search', searchTerm.trim());
                return prev;
            });
        } else {
            setSearchParams(prev => {
                prev.delete('search');
                return prev;
            });
        }
    };

    const handleFilterChange = (filter) => {
        setSearchParams(prev => {
            if (filter === 'all') {
                prev.delete('dateFilter');
            } else {
                prev.set('dateFilter', filter);
            }
            return prev;
        });
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchParams(prev => {
            prev.delete('search');
            return prev;
        });
    };

    const clearAllFilters = () => {
        setSearchTerm('');
        setSearchParams({});
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-white mb-8">Browse Events</h1>

            {/* Search and Filter UI */}
            <div className="bg-gray-800 p-4 rounded-lg mb-8 space-y-4">
                {/* Improved Search Bar */}
                <form onSubmit={handleSearch} className="flex gap-2 items-center">
                    <div className="relative flex-grow">
                        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search by title, description, college, or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-12 py-3 bg-gray-900/70 text-white rounded-xl border border-gray-700 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all shadow-lg backdrop-blur-md"
                        />
                        {searchParams.get('search') && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary text-xl"
                                aria-label="Clear search"
                            >
                                <FiX />
                            </button>
                        )}
                    </div>
                    <button 
                        type="submit"
                        className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/25 transition-all duration-200 hover:scale-[1.02]"
                    >
                        Search
                    </button>
                </form>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-gray-300 font-semibold">Filter by date:</span>
                    <button 
                        onClick={() => handleFilterChange('all')}
                        className={`px-4 py-2 rounded font-semibold transition-colors ${
                            currentFilter === 'all' 
                                ? 'bg-primary text-white bg-gray-600 shadow-lg'
                                : ' text-white hover:bg-gray-700 border border-transparent'
                        }`}
                    >
                        All Events
                    </button>
                    <button 
                        onClick={() => handleFilterChange('upcoming')}
                        className={`px-4 py-2 rounded font-semibold transition-colors ${
                            currentFilter === 'upcoming' 
                               ? 'bg-primary text-white bg-gray-600 shadow-lg'
                                : ' text-white hover:bg-gray-700 border border-transparent'
                        }`}
                    >
                        Upcoming
                    </button>
                    <button 
                        onClick={() => handleFilterChange('past')}
                        className={`px-4 py-2 rounded font-semibold transition-colors ${
                            currentFilter === 'past' 
                                ? 'bg-primary text-white bg-gray-600 shadow-lg'
                                : ' text-white hover:bg-gray-700 border border-transparent'
                        }`}
                    >
                        Past Events
                    </button>
                    
                    {/* Clear all filters button */}
                    {(searchParams.toString()) && (
                        <button 
                            onClick={clearAllFilters}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors ml-4"
                        >
                            Clear All Filters
                        </button>
                    )}
                </div>

                {/* Active filters display */}
                {searchParams.toString() && (
                    <div className="text-sm text-gray-400">
                        Active filters: 
                        {searchParams.get('search') && ` Search: "${searchParams.get('search')}"`}
                        {searchParams.get('dateFilter') && ` | Date: ${searchParams.get('dateFilter')}`}
                        {searchParams.get('college') && ` | College: ${searchParams.get('college')}`}
                        {searchParams.get('category') && ` | Category: ${searchParams.get('category')}`}
                    </div>
                )}
            </div>

            {/* Results Info */}
            <div className="mb-6">
                <p className="text-gray-400">
                    {loading ? 'Loading...' : `Found ${events.length} event${events.length !== 1 ? 's' : ''}`}
                </p>
            </div>

            {/* Event Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="bg-gray-800 rounded-lg p-6 animate-pulse">
                            <div className="h-4 bg-gray-700 rounded mb-2"></div>
                            <div className="h-6 bg-gray-700 rounded mb-4"></div>
                            <div className="h-16 bg-gray-700 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="text-center py-12">
                    <p className="text-red-500 text-xl mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/80"
                    >
                        Try Again
                    </button>
                </div>
            ) : events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-400 text-xl mb-4">No events found for your current selection.</p>
                    <button 
                        onClick={clearAllFilters}
                        className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/80"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}
        </div>
    );
}

export default EventsPage;
