import React from 'react';
import ProjectCard from './ProjectCard';
import '../../styles/ProjectList.css';

const ProjectList = ({ projects }) => {
    if (projects.length === 0) {
        return (
            <div className="no-projects">
                <h2>No projects found</h2>
                <p>Try adjusting your search or add a new project.</p>
            </div>
        );
    }

    return (
        <div className="project-list">
            <h2 className="section-title">Our Projects</h2>
            <div className="projects-grid">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default ProjectList;