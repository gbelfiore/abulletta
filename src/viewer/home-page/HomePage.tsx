"use client";

import { useEffect } from "react";

const HomePage = () => {
	useEffect(() => {
		fetch("https://www.lottomatica.it/scommesse/sport/calcio/italia/serie-a/1-1577-93")
			.then(function (response) {
				switch (response.status) {
					// status "OK"
					case 200:
						return response.text();
					// status "Not Found"
					case 404:
						throw response;
				}
			})
			.then(function (template) {
				console.log(template);
			})
			.catch(function (response) {
				// "Not Found"
				console.log(response.statusText);
			});
	}, []);
	return <div>ciaooo xxx</div>;
};

export default HomePage;
