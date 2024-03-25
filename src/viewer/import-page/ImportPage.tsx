"use client";

import { useEffect } from "react";

const ImportPage = () => {
	useEffect(() => {
		const html = fetch("https://www.lottomatica.it/scommesse/sport/calcio/italia/serie-a/1-1577-93").then((result) => {
			console.log(result);
		});
	});

	return <div>import</div>;
};

export default ImportPage;
