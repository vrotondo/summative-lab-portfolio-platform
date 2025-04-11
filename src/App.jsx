import React, { useState, useEffect } from 'react';
import ProjectForm from './components/forms/ProjectForm';
import ProjectList from './components/projects/ProjectList';

const App = () => {
  const [projects, setProjects] = useState(() => {
    try {
      const storedProjects = localStorage.getItem('projects');
      return storedProjects ? JSON.parse(storedProjects) : [];
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      return []; // Fallback to an empty array if parsing fails
    }
  });

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  return (
    <div className="app">
      <h1>Project Portfolio</h1>
      <ProjectForm addProject={addProject} />
      <ProjectList projects={projects} />
    </div>
  );
};

export default App;