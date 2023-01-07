import React from 'react'
import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";
//children is used to display the layout exported to /pages/_app.js
function Layout({ children }) {
	return (
		<div>
			<div className="layout">
				<Head>
					<meta
						name="description"
						content="Olawande Armstrong Portfolio Website"
					/>
					<link
						rel="stylesheet"
						href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
					></link>
					{/* <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link> */}
					<link rel="shortcut icon" href="/theonrex plain.png" />
					<title> TheonCoin Tracker</title>
				</Head>
				<header>
					<NavBar />
				</header>
				<main className="container-xxl">{children}</main>
				<footer>
					<Footer />
				</footer>
			</div>
		</div>
	);
}

export default Layout