import { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';
import AddProject from '../components/AddProject';
import App from '../App.css'

export default function ProjectListPage() {

	// we don't need this bc we are using the proxy in package.json
	//const API_URL = 'http://localhost:5005';

	const [projects, setProjects] = useState([]);

	const getAllProjects = () => {
		// get request to the server
		axios.get(`/api/projects`)
			.then(response => {
				console.log(response)
				setProjects(response.data);
			})
			.catch(err => console.log(err));
	}

	useEffect(() => {
		// get all the projects from the server
		getAllProjects();
		// bc of the empty dependency array we only get all the projects  
		// on the first render (when the component is mounted)
	}, )

	return (
		<div className="list">
			<AddProject refreshProjects={getAllProjects} />
			<h1></h1>

			{projects.map(project => <ProjectCard key={project._id} {...project} />)}

			
		</div>

	)
}
