import React, { useState } from 'react';
import '../../styles/ProjectCard.css';

const ProjectCard = ({ project }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    // Placeholder image if project image is not available
    const imageSrc = project.image || '/assets/images/placeholder.jpg';

    return (
        <div className="project-card">
            <div className="project-image-container">
                <img
                    src={imageSrc}
                    alt={project.title}
                    className="project-image"
                    onError={(e) => {
                        e.target.src = '/assets/images/placeholder.jpg';
                    }}
                />
                <div className="project-category">{project.category}</div>
            </div>

            <div className="project-info">
                <h3 className="project-title">{project.title}</h3>

                <p className="project-preview">
                    {project.description.substring(0, 80)}
                    {project.description.length > 80 ? '...' : ''}
                </p>

                <button
                    className="details-toggle"
                    onClick={toggleDetails}
                >
                    {showDetails ? 'Hide Details' : 'Show Details'}
                </button>

                {showDetails && (
                    <div className="project-details">
                        <p className="project-description">{project.description}</p>
                        <div className="project-meta">
                            <p><strong>Client:</strong> {project.client}</p>
                            <p><strong>Date:</strong> {project.date}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;