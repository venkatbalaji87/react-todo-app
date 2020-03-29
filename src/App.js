import React, { Fragment } from "react";

const App = () => {
  const tasks = [
    {
      text: "Buy Vegetables",
      isComplete: false
    },
    {
      text: "Read Newspaper",
      isComplete: false
    },
    {
      text: "Get Supplies",
      isComplete: false
    }
  ];

  //key is mandatory, it accepts only expression
  //fragement is given to hide div
  return (
    <Fragment>
      <h1>Todo List!</h1>
      <pre>{JSON.stringify(tasks)}</pre>
      {/* only like this u can print/ */}
      {[
        <p key={0}>Element 1</p>,
        <p key={1}>Element 2</p>,
        <p key={2}>Element 3</p>
      ]}
      <h2>List of Tasks</h2>
      {/* anything can be given in task, taskIndex */}
      {tasks.map((task, taskIndex) => {
        return <p key={taskIndex}>{task.text}</p>;
      })}
    </Fragment>
  );
};

export default App;
