import React from 'react'

import Pagination from "@etchteam/next-pagination/dist";

function pagenation() {
  return (
    <div className="stack_pagenation">
      {" "}
      <Pagination
        total={1000}
        className="pagination"
      />
    </div>
  );
}

export default pagenation