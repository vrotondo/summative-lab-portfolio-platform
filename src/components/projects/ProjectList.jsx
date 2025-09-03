import React from 'react';
import ProjectCard from './ProjectCard';
import '../../styles/ProjectList.css';

const ProjectList = ({ projects, onDeleteProject }) => {
    if (projects.length === 0) {
        return (
            <div className="no-projects">
                <div className="no-projects-content">
                    <div className="no-projects-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7v10c0 5.55 3.84 10 8 9 4.16 1 8-3.45 8-9V7l-10-5z" />
                            <path d="M8 11l2 2 4-4" />
                        </svg>
                    </div>
                    <h2>No projects found</h2>
                    <p>Try adjusting your search or filters, or add your first project to get started.</p>
                    <div className="no-projects-suggestions">
                        <span>Try searching for different keywords</span>
                        <span>Change your category filter</span>
                        <span>Add a new project</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="project-list">
            <div className="projects-header">
                <h2 className="section-title">
                    Featured Projects
                    <span className="projects-count">
                        {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                    </span>
                </h2>
            </div>

            <div className="projects-grid">
                {projects.map(project => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onDelete={onDeleteProject}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProjectList;