import React, { Fragment, useState, useEffect, useRef } from "react";
import Title from "./Components/Title";
import TaskList from "./Components/TaskList";
import TaskStatus from "./Components/TaskStatus";
import AddTaskField from "./Components/AddTasks";
import loadTasks from "./utils/loadTask";
//App function

const App = () => {
  const $inputText = useRef(null);

  const [text, setText] = useState(
    window.localStorage.getItem("task-text") || ""
  );

  const textChangeHandler = event => {
    event.persist();
    setText(event.target.value);
  };

  useEffect(() => {
    window.localStorage.setItem("task-text", text);
  });

  /**
   * componentDidUpdate will get called only when
   * the variables in the following dependencies array change
   */
  useEffect(() => {
    loadTasks()
      .then(taskArray => {
        setTasks(
          taskArray.map(item => ({
            text: item.title,
            isComplete: item.complete
          }))
        );
      })
      .catch(console.error);
  }, []);

  const addTask = () => {
    const newTask = {
      text,
      isComplete: false
    };
    setTasks([...tasks, newTask]);
    setText("");
  };

  const deleteTask = targetIndex => {
    setTasks(tasks.filter((task, taskIndex) => taskIndex !== targetIndex));
  };

  //useEffect(() => {
  // The code here will execute based on the
  // app's lifecycle
  /**
   * Gets executed at
   * componentDidMount & componentDidUpdate
   */
  // debugger;
  //});

  const toggleTask = index => {
    setTasks(
      tasks.map((task, taskIndex) => {
        if (index === taskIndex) {
          return {
            ...task,
            isComplete: !task.isComplete
          };
        }
        return task;
      })
    );
  };

  /**
   * DidMount for doing focus on input field
   */
  useEffect(() => {
    if ($inputText.current) {
      $inputText.current.focus();
    }
  }, []);

  const [tasks, setTasks] = useState([
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
  ]);

  //key is mandatory it is in react, it accepts only expression
  //fragement is given to hide div
  return (
    <Fragment>
      <Title />
      <AddTaskField
        text={text}
        textChangeHandler={textChangeHandler}
        addTask={addTask}
        inputRef={$inputText}
      />
      <TaskList tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} />
      <TaskStatus tasks={tasks} />
    </Fragment>
  );
};

// {
//   /* <h1>Todo List!</h1>
//       <pre>{JSON.stringify(tasks)}</pre>
//       {/* only like this u can print/ */
// }
// {
//   /* {[
//         <p key={0}>Element 1</p>,
//         <p key={1}>Element 2</p>,
//         <p key={2}>Element 3</p>
//       ]} */
// }
// {
//   /* <h2>List of Tasks</h2> */
// }
// {
//   /* anything can be given in task, taskIndex */
// }
// {
//   /* {tasks.map((task, taskIndex) => {
//         return <p key={taskIndex}>{task.text}</p>;
//       })}{" "} */
// }
// {
//   /* */
// }

export default App;
