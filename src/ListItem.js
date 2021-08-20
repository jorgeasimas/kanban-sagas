import { Draggable } from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
//import { addItems, updateItems } from "./Redux/Item-reducer";
import { firestore } from "./firebase.utils";
import { fetchList } from "./Redux/redux-sagas";

const Button = styled.button`
  min-width: 2px;
  width: 20px;
  height: auto;
  letter-spacing: 0.5px;
  line-height: 15px;
  padding: 0 3px 0 3px;
  font-size: 10px;
  background-color: gray;
  color: white;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  cursor: pointer;
`;

const DragItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;

const ListItem = ({ item, index, prefix, elementsRedux, fetchList }) => {
    const messagesRef = firestore.collection("kanban").doc("document");
  
        const handleClick = async () => {
        
            const copyList = { ...elementsRedux.listCopy };
            const newList = copyList[prefix].filter(
                (newList) => newList.id !== item.id);
            copyList[prefix] = newList;
            const nestList = {"listCopy": copyList}
            console.log(nestList)
            await messagesRef.set(nestList);
            const fetchData = fetchList;
            fetchData();
        };
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Button onClick={handleClick}>X</Button>

            {item.content}
          </DragItem>
        );
      }}
    </Draggable>
  );
};


const mapStateToProps = (state) => ({
  elementsRedux: state.elements
});

const mapDispatchToProps = (dispatch) => ({
  fetchList: () => dispatch(fetchList())
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);


//export default ListItem;
