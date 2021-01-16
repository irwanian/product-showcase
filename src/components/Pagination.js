import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationCpmponent = (props) => {
    const totalPage = Math.ceil(props.lengths / props.rows)
    return (
    <Pagination size="lg" aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink first href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous href="#" />
      </PaginationItem>
      {
          [...Array(totalPage)].map((page, i) => {
            return (
                    <PaginationItem key={i}>
                        <PaginationLink href="#">
                        {i + 1}
                        </PaginationLink>
                    </PaginationItem>
            )})
      }
      {/* <PaginationItem>
        <PaginationLink href="#">
          2
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          3
        </PaginationLink>
      </PaginationItem> */}
      <PaginationItem>
        <PaginationLink next href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last href="#" />
      </PaginationItem>
    </Pagination>
  );
}

export default PaginationCpmponent;