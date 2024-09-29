import {createStore} from "redux"
import reducer from '../../reducers/movie';


const initialState = {
  detail: ""
};

const movieState = {
  movieshow: ""
};




const store = createStore(reducer, initialState);
const movieStore = createStore(reducer, movieState);




export { store,movieStore};


