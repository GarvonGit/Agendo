import React, { useState, useEffect } from "react";
import "./style.css";

// get the localStorage data back from the browser
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");   //getting data from local storage using getItem which is stored in mytodolist

  if (lists) {                             //if we have data in local storage then it will return JSON.parse(lists)
    return JSON.parse(lists);                                               // else it will return empty array
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add the items function
  const addItem = () => {
    if (!inputdata) {
      alert("Text field can't be empty");           //if we click on add button without adding any text in the text field then it will show alert
    } else if (inputdata && toggleButton) {          //if we click on edit button after adding text in the text field then it will make changes in the same text field element i.e apple -> bringapple
      setItems(                                       
        items.map((curElem) => {                //if we click on add button after adding text in the text field 
          if (curElem.id === isEditItem) {                          //and it has some id then it will show alert
            return { ...curElem, name: inputdata };     //...curElem = apple, name: inputdata = bringapple
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),    //givng unique id to each item for deleting elemnt using there
        name: inputdata,                        // date and time and converting it into a string
      };
      setItems([...items, myNewInputData]);     //it will has prev data and new inputData added by clicking on text field 
      setInputData("");
    }
  };

  //edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {    //find the element which we want to edit using find and
      return curElem.id === index;                      //edit element whose ID is equal to edited ID as we want to
    });
    setInputData(item_todo_edited.name);        //edit that element whose ID is equal to edited ID
    setIsEditItem(index);                       //and set toggleButton to true
    setToggleButton(true);                      //so that we can show edit button
  };

  // how to delete items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {    //filter the elemnt which we want to delete using filter and  
      return curElem.id !== index;            //delete element whose ID is not equal to deleted ID as we want to 
    });                                             //delete that element whose ID is equal to deleted ID
    setItems(updatedItems);
  };

  // remove all the elements
  const removeAll = () => {       //while deleting all items pass an empty array
    setItems([]);
  };

  // adding localStorage so that our data is safe when we refresh, useEffect is used to run the function when the page is refreshed
  useEffect(() => {         
    localStorage.setItem("mytodolist", JSON.stringify(items));    //converting our data into string using JSON.stringify
  }, [items]);                                        //and adding our data(from mytodolist) in local storage using setItem

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>                                              {/*Using figure tag we can add content like image*/}
            <img src="./images/logo2.png" alt="todologo" />
            <figcaption>Up for somethin? Add it in your list ✌</figcaption>     {/*Using figurecaption tag we can add caption to our figure*/}
          </figure>
          <div className="addItems">         {/*making add item text box to add items in the list*/}
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />

            {/*adding CDN Icons*/}
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>   //if toggleButton is true then it will show edit button
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>    //else it will show plus button
            )}
          </div>

          {/* show our items  */}
          <div className="showItems">
            {items.map((curElem) => {         //used map function to loop and show items in the list
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}>
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;