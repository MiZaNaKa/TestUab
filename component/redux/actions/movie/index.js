class DetailAction {
    getDetail = (text) => {
      return {
        type: 'getDetail',
        text
      };
    };
    getMovieDetail = (movieshow) => {
      return {
        type: 'getMovieDetail',
        movieshow
      };
    };
  
  }
  
  export default new DetailAction()
  
  

    