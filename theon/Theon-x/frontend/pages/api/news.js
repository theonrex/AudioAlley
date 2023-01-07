// import axios from 'axios';

// export default function handler(req, res) {
// 	if (req.method === 'GET') {
// 		const options = {
// 			method: 'GET',
//   url: 'https://weather-news.p.rapidapi.com/news/lang/en',
// 			headers: {
//     'X-RapidAPI-Host': 'weather-news.p.rapidapi.com',
//     'X-RapidAPI-Key': '8f8034dd04mshe3e0fd79dfeeb65p139b0djsn42147647b635'
// 			}
// 		};
// 		axios
// 			.request(options)
// 			.then(function (response) {
// 				res.status(200).json(response.data);
// 			})
// 			.catch(function (error) {
// 				console.error(error);
// 			});
// 	} else {
// 		res.status(400);
// 	}
// }