import React from 'react';
import '../../styles/SearchBar.css';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />
            {searchQuery && (
                <button
                    className="clear-search"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default SearchBar;