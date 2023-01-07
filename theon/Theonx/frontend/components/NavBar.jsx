import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import TheonLogo from "../public/theonrex plain.png";
import Link from "next/link";


function NavBar() {




	const router = useRouter();

	// ...
	return (
		<>
			<div className="navbar-bg">
				<>
					{["xl"].map((expand) => (
						<Navbar key={expand} expand={expand} className="mb-3 container-xxl nav_mg">
							<Container fluid>
								<Navbar.Brand href="/">
									{" "}
									<img className="nav_img" src={TheonLogo.src} alt="" />{" "}
								</Navbar.Brand>
								<div className="nav_t">
									<Navbar.Toggle
										aria-controls={`offcanvasNavbar-expand-${expand}`}
									/>
								</div>

								<Navbar.Offcanvas
									id={`offcanvasNavbar-expand-${expand}`}
									aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
									placement="end"
								>
									<Offcanvas.Header closeButton>
										<Offcanvas.Title
											id={`offcanvasNavbarLabel-expand-${expand}`}
										>
											Theon-X
										</Offcanvas.Title>
									</Offcanvas.Header>
									<Offcanvas.Body>
										<Nav className="justify-content-center flex-grow-1 pe-3">
											<Nav.Link
												href="/"
												className={
													"underline" +
													(router.pathname === "/" ? " active" : "")
												}
											>
												Home
											</Nav.Link>
											{/* <Nav.Link
												href="/nft	"
												className={router.pathname == "/nft	" ? "active" : ""}
											>
												Nft
											</Nav.Link> */}
											<Nav.Link
												href="/post"
												className={router.pathname == "/post" ? "active" : ""}
											>
												Blog
											</Nav.Link>
											<Nav.Link
												href="/news"
												className={
													"underline" +
													(router.pathname === "/news" ? " active" : "")
												}
											>
												News
											</Nav.Link>
											<Nav.Link
												href="/coins"
												className={`${
													"underline" +
													(router.pathname === "/coins" ? " active" : "")
												} `}
											>
												Coins{" "}
											</Nav.Link>
											{/* <Nav.Link
												href="/contact"
												className={`${
													"underline" +
													(router.pathname === "/contact" ? " active" : "")
												} `}
											>
												Contact{" "}
											</Nav.Link> */}
										</Nav>
										<Nav className="justify-content-end ">
											<Nav.Link
												href="/Connect Wallet"
												className={`${
													"underline" +
													(router.pathname === "/connectWallet"
														? " activebtn"
														: "")
												} `}
											>
												{/* <Button className="orange-btn nav-link ">
													Connect Wallet
												</Button> */}
											</Nav.Link>
											{/* <Button
												className="purple_btn nav-link "
											>
											</Button> */}
											{/* <Button className="dark_hide_mobile">
												<DarkMode />
											</Button> */}
										</Nav>
									</Offcanvas.Body>
								</Navbar.Offcanvas>
								{/* <Button className="dark_mobile_show ">
									<DarkMode />
								</Button> */}
							</Container>
						</Navbar>
					))}
				</>
			</div>
		</>
	);
}

export default NavBar;
