import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  ArrowStart,
  ArrowEnd,
  Next,
  Prev
} from "../../styles/Icons/assets/generic";
import classes from "./Pagination.scss";
import Page from "./_Page";

export default class Pagination extends Component {
  static propTypes = {
    /**
     * Indicates the current active page
     */
    page: PropTypes.number.isRequired,

    /**
     * Number of total items that needs to be paginated
     */
    totalItems: PropTypes.number,

    /**
     * Text shown before the page number (only mobile view)
     */
    pageText: PropTypes.string,

    /**
     * Function called when a page number is clicked
     */
    onChange: PropTypes.func,

    /**
     * Number of items shown on every page
     */
    itemsPerPage: PropTypes.number,

    /**
     * Number of pages visible at the same time to the user
     */
    pageBucket: PropTypes.number,

    // Generates the URL for the single pages
    getPageUrl: PropTypes.func
  };

  static defaultProps = {
    itemsPerPage: 10,
    pageBucket: 10,
    onChange: () => {},
    getPageUrl: () => "#"
  };

  render() {
    const {
      totalItems,
      itemsPerPage,
      page,
      pageBucket,
      onChange,
      pageText,
      getPageUrl
    } = this.props;
    const pagesCount = Math.ceil(totalItems / itemsPerPage);
    const currentBucket = Math.floor((page - 0.5) / pageBucket);

    const startPage = Math.max(currentBucket * pageBucket, 1);
    const endingPage = Math.min(
      currentBucket * pageBucket + pageBucket,
      pagesCount
    );

    const pages = [];
    for (let o = startPage; o <= endingPage; o++) {
      pages.push(
        <Page
          key={`pagination-${o}`}
          number={o}
          active={page === o}
          onClick={onChange}
          url={getPageUrl(o)}
        />
      );
    }
    const nextPage = page + 1;
    const isTooBig = nextPage > pagesCount;
    const isLast = page === pagesCount;

    const previousPage = page - 1;
    const isTooSmall = previousPage < 1;
    const isFirst = page === 1;

    return (
      <>
        {pagesCount > 1 && (
          <nav role="navigation" aria-label="Pagination Navigation">
            <ul className={classes.pagination_bar}>
              <Page
                number={1}
                disabled={isFirst}
                onClick={onChange}
                icon={ArrowStart}
                url={getPageUrl(1)}
              />
              <Page
                number={isTooSmall ? 1 : previousPage}
                disabled={isTooSmall}
                icon={Prev}
                onClick={onChange}
                url={getPageUrl(isTooSmall ? 1 : previousPage)}
              />
              <li className={classes.text}>{pageText}</li>
              {pages}
              <Page
                number={isTooBig ? pagesCount : nextPage}
                disabled={isTooBig}
                icon={Next}
                onClick={onChange}
                url={getPageUrl(isTooBig ? pagesCount : nextPage)}
              />
              <Page
                number={pagesCount}
                disabled={isLast}
                icon={ArrowEnd}
                onClick={onChange}
                url={getPageUrl(pagesCount)}
              />
            </ul>
          </nav>
        )}
      </>
    );
  }
}
