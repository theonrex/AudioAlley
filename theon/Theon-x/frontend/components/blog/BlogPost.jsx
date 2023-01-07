import React from "react";
import Link from "next/link";

export default function BlogPost({
  title,
  slug,
  coverPhoto,
  description,
  authorsName,
}) {
  return (
    <div className="rowx Blog_post">
      <img src={coverPhoto.url} alt={`${title} image`} />

      <section className="mag_3">
        <Link href={"/post/" + slug} target="_blank">
          <h2>{title}</h2>
          <p>{description}</p>
        </Link>
        <div>{/* <p>{authorsName}</p> */}</div>
      </section>
    </div>
  );
}
