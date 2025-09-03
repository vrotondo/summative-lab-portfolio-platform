import React, { useState } from 'react';
import '../../styles/ProjectCard.css';

const ProjectCard = ({ project, onDelete }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this project?')) {
            onDelete(project.id);
        }
    };

    // Fallback image if project image is not available or fails to load
    const fallbackImage = 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop&crop=entropy&auto=format';
    const imageSrc = project.image || fallbackImage;

    return (
        <div
            className={`project-card ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="project-image-container">
                <img
                    src={imageSrc}
                    alt={project.title}
                    className="project-image"
                    onError={(e) => {
                        e.target.src = fallbackImage;
                    }}
                />

                {/* Overlay with delete button */}
                <div className="project-overlay">
                    <button
                        className="delete-btn"
                        onClick={handleDelete}
                        title="Delete project"
                    >
                        <span className="delete-icon">×</span>
                    </button>
                </div>

                {/* Category badge */}
                <div className="project-category">{project.category}</div>
            </div>

            <div className="project-content">
                <h3 className="project-title">{project.title}</h3>

                <div className="project-client">
                    <span className="client-label">Client:</span>
                    <span className="client-name">{project.client}</span>
                </div>

                <p className="project-preview">
                    {project.description.length > 120
                        ? `${project.description.substring(0, 120)}...`
                        : project.description
                    }
                </p>

                <button
                    className="details-toggle"
                    onClick={toggleDetails}
                >
                    <span className="toggle-icon">
                        {showDetails ? '−' : '+'}
                    </span>
                    {showDetails ? 'Hide Details' : 'Show Details'}
                </button>

                {showDetails && (
                    <div className="project-details">
                        <div className="details-divider"></div>

                        <p className="project-description">{project.description}</p>

                        <div className="project-meta">
                            <div className="meta-item">
                                <span className="meta-label">Date:</span>
                                <span className="meta-value">
                                    {project.date
                                        ? new Date(project.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })
                                        : 'Not specified'
                                    }
                                </span>
                            </div>

                            <div className="meta-item">
                                <span className="meta-label">Client:</span>
                                <span className="meta-value">{project.client}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;