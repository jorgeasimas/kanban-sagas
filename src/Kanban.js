import DropArea from "./Drop-component";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
//import { addItems, updateItems } from "./Redux/Item-reducer";
import { DragDropContext } from "react-beautiful-dnd";
import "./input.css";
import { firestore } from "./firebase.utils";
import { fetchList } from "./Redux/redux-sagas";

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
  width: 70vw;
  opacity: 0.85;
`;

const Button = styled.button`
  min-width: 2px;
  width: 150px;
  height: 35px;
  letter-spacing: 0.5px;
  line-height: 15px;
  padding: 3px 3px 3px 3px;
  font-size: 12px;
  background-color: gray;
  color: white;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  cursor: pointer;
`;

const removeFromList = (list, index) => {
  const result = [...list];
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = [...list];
  result.splice(index, 0, element);
  return result;
};

/* not in use anymore as Object.keys will do the same as 
creating const to be the key to loop inside elementsRedux(data) to return arrays: backLog, 
inProgress and done
const head = ["backLog", "onGoing", "done"];*/

function KanbanList({ fetchList, elements, loaded, error }) {
  const [task, setTask] = useState("");
  const [id, setId] = useState(1);
  const messagesRef = firestore.collection("kanban").doc("document");

  useEffect(() => {
    const fetchData = fetchList;
    fetchData();
}, []);

  const handleClick = async (e) => {
    e.preventDefault();
    const fetchData = fetchList;
    fetchData();
        if (task !== "") {
        const listCopy = { ...elements.listCopy };
        setId((previous) => previous + 1);
        const newId = id.toString();
        const newItem = { id: newId, content: task };
        const newTodo = listCopy["backLog"];
        newTodo.push(newItem);
        listCopy["backLog"] = newTodo;
        await messagesRef.set({listCopy});//saves and updates firestore document
        } 
        else {alert("please fill out field");}
    setTask("");
  };

  const onDragEnd = async (result) => {
    const fetchData = fetchList;
    fetchData();
    if (!result.destination) {return;}
    const listCopy = { ...elements.listCopy };
    //it will save the list of element is coming from
    const sourceList = listCopy[result.source.droppableId];
    //removedFromList returns [removed as item, result as Array]
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    //will receive result Array from removeFromList method
    listCopy[result.source.droppableId] = newSourceList;
 //   setElementsRedux(listCopy)
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    //      updateRedux(listCopy);
    await messagesRef.set({listCopy});//saves and updates firestore document
  };
  return (
    <div className="App">
      <div className="sign-in">
        <form>
          <div className="group">
            <input
              className="form-input"
              name="task"
              type="task"
              onChange={(e) => setTask(e.target.value)}
              value={task}
              label="task"
              placeholder="type new task here"
              required
            />
            <Button onClick={handleClick}>ADD New Task</Button>
          </div>
        </form>
        <br></br>
        <DragDropContext onDragEnd={onDragEnd}>
          {loaded ? (
            <ListGrid>
             {Object.keys(elements.listCopy).map((key) => (
                <DropArea
                  elements={elements.listCopy[key]} //elements["todo"], elements["inProgress"]...
                  key={key} //["todo"] then ["inProgress"]...
                  prefix={key}
                />))}
            </ListGrid>) 
            : (<h1>Loadind...</h1>)
          }
        )
        </DragDropContext>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  elements: state.elements,
  loaded: state.loaded,
  error: state.error
});
const mapDispatchToProps = (dispatch) => ({
  fetchList: () => dispatch(fetchList())
});

export default connect(mapStateToProps, mapDispatchToProps)(KanbanList);