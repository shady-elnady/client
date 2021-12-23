import axios from 'axios';
import globalHook from 'use-global-hook';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const initialState = {
  counter: 0,
  user: null,
  users: [],
  imgResult: null,
  send: false,
};

export const actions = {    
  GET_USERS: (store, users) => {
    axios.get("http://localhost:8000/api/users/", {})
      .then((response) => {

        store.setState({
          users: response.data
        });

      }).catch((e) => {
        console.log("Error:", e)
      })
  },
  
  CREATE_USER: (store, params) => {

    axios.post("http://localhost:8000/api/users/", params)
    .then((response) => {

      store.setState({
        user: response.data.username
      });

      history.replace("/") // Changes route, but does not make corresoponding component show

      console.log("Create user", response)
    }).catch((e) => {
      console.log("Error:", e)
    })

  },

  SEND_IMAGE: (store, img) => {
    axios.post("http://localhost:8000/api/digit/", img)
    .then((response) => {

      store.setState({
        imgResult: response.data.result,
        send: true
      }); 

      history.replace("/") // Changes route, but does not make corresoponding component show

      console.log("Send Image", response.data)
    }).catch((e) => {
      console.log("Error:", e)
    })
  },
};

const useGlobal = globalHook( initialState, actions);

export default useGlobal
