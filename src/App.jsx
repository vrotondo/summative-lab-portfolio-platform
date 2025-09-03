import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import ProjectForm from './components/forms/ProjectForm';
import ProjectList from './components/projects/ProjectList';
import './styles/App.css';

const App = () => {
  const [projects, setProjects] = useState(() => {
    try {
      const storedProjects = localStorage.getItem('projects');
      return storedProjects ? JSON.parse(storedProjects) : [];
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      return [];
    }
  });

  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  const categories = ['All', 'Branding', 'Web Design', 'UI/UX', 'Marketing', 'Print', 'Illustration'];

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  // Filter and sort projects
  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort projects
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date || Date.now()) - new Date(a.date || Date.now());
        case 'oldest':
          return new Date(a.date || Date.now()) - new Date(b.date || Date.now());
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, searchQuery, sortBy]);

  const addProject = (newProject) => {
    const projectWithMetadata = {
      ...newProject,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    setProjects([projectWithMetadata, ...projects]);
    setShowForm(false);
  };

  const deleteProject = (id) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Creative <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="hero-subtitle">
            Showcasing innovative design solutions that drive results
          </p>
          <button
            className="cta-button"
            onClick={() => setShowForm(true)}
          >
            Add New Project
          </button>
        </div>
        <div className="hero-particles"></div>
      </section>

      {/* Enhanced Header with Controls */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        setShowForm={setShowForm}
      />

      {/* Main Content */}
      <main className="main-content">
        <ProjectList
          projects={filteredProjects}
          onDeleteProject={deleteProject}
        />

        {/* Project Form Modal */}
        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <ProjectForm
                addProject={addProject}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;