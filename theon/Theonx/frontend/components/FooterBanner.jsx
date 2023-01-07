import React from 'react'
import Link from "next/link";
// import image from client
import { urlFor } from "../lib/client";

function FooterBanner({ footerBanner }) {
	return (
		<div>
			<div className="rowx">
				<div className="col30">
					<div className="features_img">
						<img
							src="https://img.icons8.com/external-basic-line-gradient-yogi-aprelliyanto/300/000000/external-secure-fintech-basic-line-gradient-yogi-aprelliyanto.png"
							alt="crypto"
						/>
					</div>
					<section className="features_text">
						<h1>Security</h1>
						<p>
							Get the latest news from crypto to nft to defi and all latest news
							from crypto to nft to defi and all latest news from crypto to nft
							to defi and all others
						</p>
					</section>
				</div>{" "}
				<div className="col30">
					<div className="features_img">
						<img
							src="https://img.icons8.com/external-basic-line-gradient-yogi-aprelliyanto/300/000000/external-secure-fintech-basic-line-gradient-yogi-aprelliyanto.png"
							alt="crypto"
						/>
					</div>
					<section className="features_text">
						<h1>Security</h1>
						<p>
							Get the latest news from crypto to nft to defi and all latest news
							from crypto to nft to defi and all latest news from crypto to nft
							to defi and all others
						</p>
					</section>
				</div>{" "}
				<div className="col30">
					<div className="features_img">
						<img
							src="https://img.icons8.com/external-basic-line-gradient-yogi-aprelliyanto/300/000000/external-secure-fintech-basic-line-gradient-yogi-aprelliyanto.png"
							alt="crypto"
						/>
					</div>
					<section className="features_text">
						<h1>Security</h1>
						<p>
							Get the latest news from crypto to nft to defi and all latest news
							from crypto to nft to defi and all latest news from crypto to nft
							to defi and all others
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}

export default FooterBanner