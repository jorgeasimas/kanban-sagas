import "./styles.css";
import React from "react";
import KanbanList from "./Kanban";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <KanbanList />
      </div>
    );
  }
}

export default App;
