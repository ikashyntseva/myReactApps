import React, { Component } from "react";

export class AddTask extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.handleOnChange = e => {
      props.inputTask(e.target.value);
    };
    this.addTask = () => {
      const currentTaskName = this.input.current.value;
      if (currentTaskName.length) {
        this.input.current.value = "";
        this.input.current.focus();
        props.handleAddTask(currentTaskName);
      }
    };
    this.onEnterPress = e => {
      if (e.keyCode === 13) {
        this.addTask();
      }
    };
  }

  componentDidMount() {
    this.input.current.focus();
  }
  render() {
    const { name } = this.props.listData;
    return (
      <React.Fragment>
        <input
          type="text"
          placeholder="Task"
          ref={this.input}
          defaultValue=""
          onKeyDown={this.onEnterPress}
          onChange={this.handleOnChange}
        />
        <button onClick={this.addTask} disabled={!name.length}>
          Create task
        </button>
      </React.Fragment>
    );
  }
}
