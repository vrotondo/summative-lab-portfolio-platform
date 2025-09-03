import React, { useState } from 'react';
import '../../styles/ProjectForm.css';

const ProjectForm = ({ addProject, onCancel }) => {
    const [projectData, setProjectData] = useState({
        title: '',
        category: '',
        image: '',
        description: '',
        client: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({
            ...projectData,
            [name]: value
        });

        // Clear error for this field when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!projectData.title.trim()) {
            newErrors.title = 'Project title is required';
        } else if (projectData.title.trim().length < 3) {
            newErrors.title = 'Title must be at least 3 characters long';
        }

        if (!projectData.category.trim()) {
            newErrors.category = 'Please select a category';
        }

        if (!projectData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (projectData.description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters long';
        }

        if (!projectData.client.trim()) {
            newErrors.client = 'Client name is required';
        }

        // Validate image URL if provided
        if (projectData.image.trim() && !isValidURL(projectData.image.trim())) {
            newErrors.image = 'Please provide a valid URL for the image';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Helper function to validate URLs
    const isValidURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);

            try {
                // Simulate API delay for better UX
                await new Promise(resolve => setTimeout(resolve, 500));

                // Set a default placeholder image if the image field is empty
                const projectWithDefaults = {
                    ...projectData,
                    image: projectData.image.trim() || 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop',
                    title: projectData.title.trim(),
                    description: projectData.description.trim(),
                    client: projectData.client.trim()
                };

                addProject(projectWithDefaults);

                // Reset form
                setProjectData({
                    title: '',
                    category: '',
                    image: '',
                    description: '',
                    client: ''
                });
            } catch (error) {
                console.error('Error adding project:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="project-form-container">
            <div className="form-header">
                <h2>Add New Project</h2>
                <button
                    className="close-btn"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    type="button"
                >
                    ×
                </button>
            </div>

            <form className="project-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">
                        Project Title <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={projectData.title}
                        onChange={handleChange}
                        className={errors.title ? 'error' : ''}
                        placeholder="Enter an engaging project title"
                        disabled={isSubmitting}
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="category">
                        Category <span className="required">*</span>
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={projectData.category}
                        onChange={handleChange}
                        className={errors.category ? 'error' : ''}
                        disabled={isSubmitting}
                    >
                        <option value="">Choose a category</option>
                        <option value="Branding">Branding</option>
                        <option value="Web Design">Web Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Print">Print</option>
                        <option value="UI/UX">UI/UX</option>
                        <option value="Illustration">Illustration</option>
                    </select>
                    {errors.category && <span className="error-message">{errors.category}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="client">
                        Client <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="client"
                        name="client"
                        value={projectData.client}
                        onChange={handleChange}
                        className={errors.client ? 'error' : ''}
                        placeholder="Client or company name"
                        disabled={isSubmitting}
                    />
                    {errors.client && <span className="error-message">{errors.client}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="image">
                        Image URL <span className="optional">(Optional)</span>
                    </label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={projectData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className={errors.image ? 'error' : ''}
                        disabled={isSubmitting}
                    />
                    {errors.image && <span className="error-message">{errors.image}</span>}
                    <span className="help-text">
                        Leave blank to use a placeholder image, or paste a URL to your project image
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="description">
                        Description <span className="required">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={projectData.description}
                        onChange={handleChange}
                        rows="5"
                        className={errors.description ? 'error' : ''}
                        placeholder="Describe your project, its goals, challenges, and outcomes..."
                        disabled={isSubmitting}
                    ></textarea>
                    {errors.description && <span className="error-message">{errors.description}</span>}
                    <div className="character-count">
                        {projectData.description.length} characters
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="loading-spinner"></span>
                                Adding Project...
                            </>
                        ) : (
                            <>
                                <span className="btn-icon">+</span>
                                Add Project
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;