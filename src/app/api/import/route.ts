import { NextRequest } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function GET(req: NextRequest) {
	const url = req.nextUrl.searchParams.get("url");

	if (url) {
		const selector = "tr[data-evndate]";
		chromium.setGraphicsMode = false;

		const options = {
			args: chromium.args,
			defaultViewport: chromium.defaultViewport,
			executablePath: await chromium.executablePath(),
			headless: chromium.headless,
			// headless: false,
		};

		// const browser = await chromium.puppeteer.launch(options);

		const browser = await puppeteer.launch(options);
		console.log(1);
		try {
			console.log(2);
			const page = await browser.newPage();
			await page.goto(url);
			console.log(3);
			const recipeNames = await page.$$eval(selector, (nodes) => {
				console.log(4);
				return nodes.map((node) => {
					console.log(5);
					const betterid = node.dataset.evtid;
					const date = node.dataset.evndate?.split(" ")[0];
					const time = node.querySelector("td.time")?.textContent;
					const eventName = node.dataset.evtname?.split(" - ");
					const teamin = eventName?.[0];
					const teamout = eventName?.[1];

					const odds = node.querySelectorAll("td.ow");
					const res_1 = odds[0].textContent;
					const res_x = odds[1].textContent;
					const res_2 = odds[2].textContent;

					return { betterid, date, time, teamin, teamout, res_1, res_x, res_2 };
				});
			});

			return new Response(JSON.stringify({ status: "ok", data: recipeNames }), { status: 200 });
		} catch (error) {
			console.log(error);
			return new Response(JSON.stringify({ status: "ko", error: "problem with crawler" }), { status: 400 });
		} finally {
			await browser.close();
		}
	}
	return new Response(JSON.stringify({ status: "ko", error: "url is required" }), { status: 400 });
}
