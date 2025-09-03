import React from 'react';
import SearchBar from '../common/SearchBar';
import '../../styles/Header.css';

const Header = ({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    categories,
    setShowForm
}) => {
    return (
        <header className="header">
            <div className="header-content">
                {/* Search Section */}
                <div className="search-section">
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>

                {/* Filter Controls */}
                <div className="filter-controls">
                    <div className="category-filters">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="sort-controls">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="title">A-Z</option>
                        </select>

                        <button
                            className="add-project-btn"
                            onClick={() => setShowForm(true)}
                        >
                            <span className="btn-icon">+</span>
                            Add Project
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;