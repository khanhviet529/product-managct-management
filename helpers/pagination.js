module.exports = (pageQuery , limitPage, countProduct=0) => {
  let objectPagination = {
    currentPage: isNaN(pageQuery) ? 1 : parseInt(pageQuery),
    limitPage: limitPage
  }    
  objectPagination.indexPage = (objectPagination.currentPage - 1 ) * objectPagination.limitPage;

  objectPagination.totalPages = Math.ceil(countProduct / objectPagination.limitPage);
  return objectPagination;
}