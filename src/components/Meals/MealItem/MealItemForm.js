import { useRef , useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
    const [amountisValid,setamountisValid]= useState(true);
  const amountInputRef = useRef();

  const Formhandler = (event) => {
    event.preventDefault();

    const enteredamount = amountInputRef.current.value;
    const enteredamountNumber = +enteredamount;

    if (
      enteredamount.trim().length === 0 ||
      enteredamountNumber < 1 ||
      enteredamountNumber > 5
    ) {
        setamountisValid(false);
      return;
    }
    setamountisValid(true);
    props.onAddCart(enteredamountNumber);
  };

  return (
    <form className={classes.form} onSubmit={Formhandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "Amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountisValid && <p> Please enter a valid amount.</p>}
    </form>
  );
};

export default MealItemForm;
