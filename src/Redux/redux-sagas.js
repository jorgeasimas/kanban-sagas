import { takeEvery, put, all, call } from "redux-saga/effects";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { firestore } from ".././firebase.utils";

const messagesRef = firestore.collection("kanban").doc("document");

const requestList = () => {
  return { type: "REQUESTED_List" };
};

const requestListSuccess = (data) => {
  return { type: "REQUESTED_List_SUCCEEDED", payload: data };
};

const requestListError = () => {
  return { type: "REQUESTED_List_FAILED" };
};

export const fetchList = () => {
  return { type: "FETCHED_List" };
};

export const updateList = (item) => {
  return { type: "UPDATE_List" };
};

//Reducer
const Initial_State = {
  elements: {},
  loaded: false,
  error: 10
};

const reducer = (state = Initial_State, action) => {
  switch (action.type) {
    case "REQUESTED_List":
      console.log("initial");
      return {
        ...state,
        elements: {},
        loaded: false,
        error: 15
      };
    case "REQUESTED_List_SUCCEEDED":
      console.log("succeeded");
      return {
        ...state,
        elements: action.payload,
        loaded: true,
        error: 20
      };
    case "REQUESTED_List_FAILED":
      return {
        ...state,
        elements: {},
        loaded: false,
        error: 25
      };
    default:
      return state;
  }
};

function* rootSaga() {
  yield all([call(watchFetchList)]);
}

export function* watchFetchList() {
  console.log("saga");
  yield takeEvery("FETCHED_List", fetchListAsync);
}

export function* fetchListAsync() {
  try {
    yield put(requestList());
    const data = yield call(() => {
      return messagesRef.get().then((doc) => doc.data());
    });
    /*     
      fetch(
        "https://jsonplaceholder.typicode.com/users"
      ).then((responde) => responde.json());
    });*/
    console.log(data);
    yield put(requestListSuccess(data));
  } catch (error) {
    yield put(requestListError());
  }
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;