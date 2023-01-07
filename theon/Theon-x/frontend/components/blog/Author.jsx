import React from "react";
import Link from "next/link";

export default function Author({ authorsName, avatar }) {
  return (
    <div className="rowx">
      <section className="mag_3">
        <div className="authors_avatar">
          <img src={avatar.url} alt={`${authorsName} image`} />
          <section>
            <p className="authorsName"> {authorsName}</p>
            <p className="authors_job_description"> Technical Writer</p>
          </section>
        </div>
      </section>
    </div>
  );
}
