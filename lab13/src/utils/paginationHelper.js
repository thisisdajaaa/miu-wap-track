const getPaginationData = (page, limit, totalCount) => {
  let currentPage = page ? parseInt(page, 10) : 1;
  const pageLimit = limit ? parseInt(limit, 10) : 10;
  const totalPages = Math.ceil(totalCount / pageLimit);

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const startIndex = (currentPage - 1) * pageLimit;
  const endIndex = currentPage * pageLimit;

  const pagination = {};

  if (endIndex < totalCount) {
    pagination.next = {
      page: currentPage + 1,
      limit: pageLimit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: currentPage - 1,
      limit: pageLimit,
    };
  }

  return {
    ...pagination,
    currentPage,
    pageLimit,
    totalPages,
    totalCount,
  };
};

const paginate = (array, page, limit) => {
  const currentPage = page ? parseInt(page, 10) : 1;
  const pageLimit = limit ? parseInt(limit, 10) : 10;
  const startIndex = (currentPage - 1) * pageLimit;

  return array.slice(startIndex, startIndex + pageLimit);
};

module.exports = {
  getPaginationData,
  paginate,
};
