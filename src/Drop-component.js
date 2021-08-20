import { Droppable } from "react-beautiful-dnd";
import React from "react";
import ListItem from "./ListItem";
import styled from "styled-components";

const ColumnHeader = styled.div`
  border-radius: 6px;
  color: white;
  height: auto;
  margin-bottom: 20px;
  text-transform: uppercase;
  padding: 15px;
  background: ${(props) =>
    props.prefix === "backLog" ? "palevioletred" : "green"};
`;

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #d4d4d4;
  box-shadow: 8px 4px gray;
`;

const DropArea = ({ prefix, elements }) => (
  <DroppableStyles>
    <ColumnHeader prefix={prefix}>{prefix}</ColumnHeader>
    <Droppable droppableId={`${prefix}`}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {elements.map((item, index) => (
            <ListItem key={item.id} item={item} index={index} prefix={prefix} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DroppableStyles>
);

export default DropArea;