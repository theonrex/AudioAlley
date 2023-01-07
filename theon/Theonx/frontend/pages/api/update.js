// import axios from 'axios';

// export default async function handler(req, res) {
// 	const options = {
// 		method: 'GET',
// 		url: "https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news",
// 		params: {
// 			pair_ID: '1057391', // Setting Bitcoin as the general focus of the news.
// 			page: req.query.page, // Query parameter sent from the client side.
// 			time_utc_offset: '28800',
// 			lang_ID: '1'
// 		},
// 		headers: {
// 					"X-RapidAPI-Host": "investing-cryptocurrency-markets.p.rapidapi.com",
// 			"X-RapidAPI-Key": "8f8034dd04mshe3e0fd79dfeeb65p139b0djsn42147647b635",
// 		}
// 	};
// 	axios
// 		.request(options)
// 		.then(function (response) {
// 			res.status(200).json(response.data);
// 		})
// 		.catch(function (error) {
// 			console.error(error);
// 		});
// }