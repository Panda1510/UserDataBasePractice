import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import { useState, useRef } from "react";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from '../Helpers/Wrapper';

const AddUser = (props) => {

  const nameInputRef = useRef(); // finally will have the name input dom 
  const ageInputRef = useRef();

  //note while using refs, we can get rid of the state, and the state handling functions

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
    //   alert("One of the username or age field is empty!");
        setError({
            title: 'Invalid input',
            message: 'Please enter a valid name and age (non-empty values)',
        });
      return;
    }
    if (+enteredUserAge < 1) {
      // used +enteredAge to check if the enteredAge is a number or not
    //   alert("Entered Age is invalid, Please enter an age > 1");
    setError({
        title: 'Invalid Age',
        message: 'Please enter a valid age (> 1).'
    });
    //   setEnteredAge("");
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);

    // using refs for manipulating the DOM, but not a good practice to do so
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";

    // setEnteredUsername("");
    // setEnteredAge("");
  };

  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
      setError(null);
  }

  return (
    <Wrapper>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm = {errorHandler}/>}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref = {nameInputRef}
          />
          <label htmlFor="age">Age: </label>
          <input
            type="number"
            id="age"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref = {ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
