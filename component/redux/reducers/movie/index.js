const reducer = (state, action) => {
  
    switch (action.type) {
      case 'getDetail':
        return {
          ...state,
          detail: action.text
        };
      case 'getMovieDetail':
        return {
          ...state,
          movieshow: action.movieshow
        };

      default:
        return state;
    }
};
  
export default reducer;
  