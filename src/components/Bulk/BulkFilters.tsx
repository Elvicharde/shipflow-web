import React from 'react';

const BulkFilters: React.FC = () => {
    const [filters, setFilters] = React.useState({
        status: '',
        dateRange: [null, null],
        searchTerm: '',
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            dateRange: [startDate, endDate],
        }));
    };

    const applyFilters = () => {
        // Logic to apply filters to the bulk shipment list
    };

    return (
        <div className="bulk-filters">
            <h3>Filters</h3>
            <div>
                <label>Status:</label>
                <select name="status" value={filters.status} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                </select>
            </div>
            <div>
                <label>Date Range:</label>
                {/* Date range picker component can be integrated here */}
            </div>
            <div>
                <label>Search:</label>
                <input
                    type="text"
                    name="searchTerm"
                    value={filters.searchTerm}
                    onChange={handleFilterChange}
                />
            </div>
            <button onClick={applyFilters}>Apply Filters</button>
        </div>
    );
};

export default BulkFilters;