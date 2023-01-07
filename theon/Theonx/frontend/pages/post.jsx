import React from "react";
// import { client } from "../lib/client";
import { GraphQLClient, gql } from "graphql-request";
import BlogPost from "../components/blog/BlogPost";
import Author from "../components/blog/Author"
import Link from "next/link";
const graphcms = new GraphQLClient(
  "https://api-sa-east-1.hygraph.com/v2/clchq1ysr1i3i01t856vrejv5/master"
);

const query = gql`
  {
    posts {
      title
      slug
      updatedAt
      id
      datePublished
      createdAt
      description
      coverPhoto {
        url
      }
    }
   
  }
`;


const authorsQuery = gql`
  {
   
    authors {
      name
      createdAt
      avatar {
        url
        fileName
        id
        locale
      }
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(query);
  // const { authors } = await graphcms.request(query);
  const { authors } = await graphcms.request(authorsQuery);

  return {
    props: {
      posts,
      authors,
    },
    revalidate: 10,
  };
}



const blog = ({ posts, authors }) => {
console.log(authors);
  return (
    <div className=" container">
      <div className="post_head">
        <header>A collection of blog about Blockchain</header>
      </div>
      <div className="rowx ">
        <div className="col30 post_body">
          {posts?.map((post, index) => (
            <BlogPost
              key={index}
              title={post.title}
              slug={post.slug}
              coverPhoto={post.coverPhoto}
              description={post.description}
            />
          ))}
          {authors?.map((author, index) => (
            <Author
              key={index}
              authorsName={author.name}
              avatar={author.avatar}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default blog;
