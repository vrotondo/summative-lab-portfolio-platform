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
            newErrors.title = 'Title is required';
        }

        if (!projectData.category.trim()) {
            newErrors.category = 'Category is required';
        }

        if (!projectData.description.trim()) {
            newErrors.description = 'Description is required';
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Set a default placeholder image if the image field is empty
            const projectWithDefaultImage = {
                ...projectData,
                image: projectData.image.trim() || '/assets/images/placeholder.jpg', // Default placeholder image
            };

            addProject(projectWithDefaultImage);
            // Form will be hidden after submission by parent component
        }
    };

    return (
        <div className="project-form-container">
            <h2>Add New Project</h2>

            <form className="project-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Project Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={projectData.title}
                        onChange={handleChange}
                        className={errors.title ? 'error' : ''}
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={projectData.category}
                        onChange={handleChange}
                        className={errors.category ? 'error' : ''}
                    >
                        <option value="">Select a category</option>
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
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={projectData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className={errors.image ? 'error' : ''}
                    />
                    {errors.image && <span className="error-message">{errors.image}</span>}
                    <span className="help-text">Leave blank to use a placeholder image</span>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={projectData.description}
                        onChange={handleChange}
                        rows="4"
                        className={errors.description ? 'error' : ''}
                    ></textarea>
                    {errors.description && <span className="error-message">{errors.description}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="client">Client</label>
                    <input
                        type="text"
                        id="client"
                        name="client"
                        value={projectData.client}
                        onChange={handleChange}
                        className={errors.client ? 'error' : ''}
                    />
                    {errors.client && <span className="error-message">{errors.client}</span>}
                </div>

                <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="submit-btn">
                        Add Project
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;