import React from "react";
import { Blog, FooterBanner, Author, HeroBanner, Home } from "../components";
// import Author from '../components/Author';
import { GraphQLClient, gql } from "graphql-request";

const graphcms = new GraphQLClient(
  "https://api-sa-east-1.hygraph.com/v2/clchq1ysr1i3i01t856vrejv5/master"
);

const QUERY = gql`
  {
    posts {
      title
      slug
      updatedAt
      id
      datePublished
      createdAt
      coverPhoto {
        url
      }
      content {
        html
      }
    }
  }
`;

const index = () => {
  return (
    <div>
      <HeroBanner />
      <Home />
    </div>
  );
};
//get data from sanity {client} imported at the top

// export const getServerSideProps = async () => {
//   //grab all items in product from sanity
//   const query = '*[_type == "blogPost"]';
//   //join the generated data form {client} with products
//   const posts = await client.fetch(query);

// //return the generated data for use
// 	const authorQuery = '*[_type == "author"]';
// 	//join the generated data form {client} with products
// 	const authors = await client.fetch(authorQuery);
//   return {
//     props: {posts, authors}
//   }
// }

export default index;
