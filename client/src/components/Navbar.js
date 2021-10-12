import React from 'react'
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';
import App from '../App.css'

export default function Navbar(props) {

	const handleLogout = () => {
		logout().then(() => {
			props.setUser(null);
		})
	}

	return (
		<nav>
			{props.user ? (
				<>
					<Link to="/">
						<button className="container">Home</button>
					</Link>
					<Link to="/projects">
						<button>My Notes</button>
					</Link>
					<Link to="/" onClick={() => handleLogout()}>
						<button>Logout</button>
					</Link>
				</>
			) : (
				<>
					<Link to="/signup">
						<button>Signup</button>
					</Link>
					<Link to="/login">
						<button>Login</button>
					</Link>
				</>
			)}
		</nav>
	)
}
