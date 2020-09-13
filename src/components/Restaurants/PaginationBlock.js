import React from 'react';
import { useDispatch } from 'react-redux';

import { fetchRestaurantsByDefault } from '../../redux/slices/restaurantsSlice';

export default ({ currentPage, pageLimit, queryData, isLast }) => {
  console.log(isLast);
  const dispatch = useDispatch();
  const paginationClasses = isLast
    ? 'pagination-container last'
    : 'pagination-container';
  let previousPart = null;
  let nextPart = null;

  const fetchAnotherPage = (pageNumber) => {
    const newQueryData = { ...queryData };
    newQueryData.queryPage = pageNumber;

    dispatch(fetchRestaurantsByDefault(newQueryData));
  };

  if (currentPage > 1) {
    previousPart = (
      <React.Fragment>
        <button
          href='#'
          className='pagination-block'
          onClick={() => fetchAnotherPage(currentPage + -1)}
        >
          Prev
        </button>
        <button
          href='#'
          className='pagination-block'
          onClick={() => fetchAnotherPage(1)}
        >
          1
        </button>
        <button href='#' className='pagination-block'>
          ...
        </button>
      </React.Fragment>
    );
  }

  if (pageLimit > 1 && currentPage !== pageLimit) {
    nextPart = (
      <React.Fragment>
        <button href='#' className='pagination-block'>
          ...
        </button>
        <button
          href='#'
          className='pagination-block'
          onClick={() => fetchAnotherPage(pageLimit)}
        >
          {pageLimit}
        </button>
        <button
          onClick={() => fetchAnotherPage(currentPage + 1)}
          href='#'
          className='pagination-block'
        >
          Next
        </button>
      </React.Fragment>
    );
  }

  return (
    <div className={paginationClasses}>
      {previousPart}
      <button href='#' className='pagination-block'>
        {currentPage}
      </button>
      {nextPart}
    </div>
  );
};
