import React from 'react';
import SearchBar from '../common/SearchBar';
import '../../styles/Header.css';

const Header = ({ searchQuery, setSearchQuery, setShowForm }) => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo-container">
                    <h1>Creative Portfolio</h1>
                </div>

                <div className="header-actions">
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />

                    <button
                        className="add-project-btn"
                        onClick={() => setShowForm(true)}
                    >
                        Add Project
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;