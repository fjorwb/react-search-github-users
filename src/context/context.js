import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

// const url = 'https://api.github.com/rate_limit';
// console.log(url);

const GithubContext = React.createContext();

// Provider, Consumer - GithubContext.Provider

const GithubProvider = ({ children }) => {
	const [githubUser, setGithubUser] = useState(mockUser);
	const [repos, setRepos] = useState(mockRepos);
	const [followers, setFollowers] = useState(mockFollowers);

	// request loading
	const [requests, setRequests] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState({ show: false, msg: '' });

	const searchGithubUser = async (user) => {
		// toggle error
		toggleError();
		setIsLoading(true);
		const response = await axios(`${rootUrl}/users/${user}`).catch((err) => console.log(err));
		if (response) {
			setGithubUser(response.data);
			const { login, followers_url } = response.data;

			// // repos
			// axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) =>
			// 	setRepos(response.data)
			// 	);
			// 	// followers
			// 	axios(`${followers_url}?per_page=100`).then((response) => setFollowers(response.data));

			// to update when all is settled

			await Promise.allSettled([
				axios(`${rootUrl}/users/${login}/repos?per_page=100`),
				axios(`${followers_url}?per_page=100`),
			])
				.then((results) => {
					const [repos, followers] = results;
					const status = 'fulfilled';
					if (repos.status === status) {
						setRepos(repos.value.data);
					}
					if (followers.status === status) {
						setFollowers(followers.value.data);
					}
				})
				.catch((err) => console.log(err));
		} else {
			toggleError(true, 'there is no user with that username');
		}
		checkRequests();
		setIsLoading(false);
	};

	// check rate
	const checkRequests = () => {
		axios(`${rootUrl}/rate_limit`)
			.then(({ data }) => {
				let {
					rate: { remaining },
				} = data;
				setRequests(remaining);
				if (remaining === 0) {
					toggleError(true, 'Sorry, you have exceed your hourly request limit');
				}
				// console.log({ data });
			})
			.catch((err) => console.log(err));
	};

	// const fetchUser = async (url) => {
	// 	const response = await fetch(url);
	// 	const data = await response.json();
	// 	try {
	// 		let {
	// 			rate: { remaining },
	// 		} = data;
	// 		setRequests(remaining);
	// 		if (remaining === 0) {
	// 			// throw an error
	// 		}
	// 		console.log(data.rate);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	// const toggleError = (show, msg) => {
	// 	setError(show, msg);
	// };

	function toggleError(show = false, msg = '') {
		setError({ show, msg });
	}

	// error

	useEffect(() => {
		// fetchUser(url);
		checkRequests();
		// console.log('hey!!!!');
	});

	return (
		<GithubContext.Provider
			value={{
				githubUser,
				repos,
				followers,
				requests,
				error,
				searchGithubUser,
				isLoading,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export { GithubProvider, GithubContext };
