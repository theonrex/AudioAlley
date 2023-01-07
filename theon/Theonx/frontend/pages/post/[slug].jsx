import React from "react";
import { GraphQLClient, gql } from "graphql-request";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Link from "next/link";
const graphcms = new GraphQLClient(
  "https://api-sa-east-1.hygraph.com/v2/clchq1ysr1i3i01t856vrejv5/master"
);

const query = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
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
        raw
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(query, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

const Slug = ({ post }) => {
  // console.log(post);

  return (
    <div className="container">
      <div className="tflex">
        <div className="product-detail-container">
          {/* {post && post.map((posts) => (
          ))} */}
          <div>
            <div className="image_container">
              {/* <img src={urlFor(mainImage)} className="cart-product-image" />{" "} */}
            </div>
            <div className="blog_current_title">{post.title}</div>

            <hr />
            <div
              className="blog_body"
              dangerouslySetInnerHTML={{ __html: post.content.html }}
            >
              
            </div>
          </div>
          <hr />
          {/* <p>{publishedAt}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Slug;
