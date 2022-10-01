import { useRef , useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty=value=>value.trim()==='';
const isSixchars=value=>value.trim().length===6;

const Checkout = (props) => {
   const [FormValidity,setFormValidity]= useState({
        name:true,street:true,postalcode:true,city:true
    });

const Nameref=useRef();
const Streetref=useRef();
const PostalCoderef=useRef();
const Cityref=useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
const enteredname=Nameref.current.value;
const enteredstreet=Streetref.current.value;
const enteredpostalCode=PostalCoderef.current.value;
const enteredcity=Cityref.current.value;

const EnteredNameisValid=!isEmpty(enteredname);
const EnteredStreetisValid=!isEmpty(enteredstreet);
const EnteredCityisValid=!isEmpty(enteredcity);
const EnteredPostalCodeisValid=isSixchars(enteredpostalCode);
setFormValidity({
    name:EnteredNameisValid,street:EnteredStreetisValid,postalcode:EnteredPostalCodeisValid,city:EnteredCityisValid
});

const FormisValid=EnteredNameisValid && EnteredStreetisValid && EnteredPostalCodeisValid && EnteredCityisValid;
if(!FormisValid){
    return;
}
props.onConfirmOrder({
    name:enteredname,street:enteredstreet,postalcode:enteredpostalCode,city:enteredcity
});
  };

  const nameclass=`${classes.control} ${!FormValidity.name?classes.invalid:''}`;
  const streetclass=`${classes.control} ${!FormValidity.street?classes.invalid:''}`;
  const postalcodeclass=`${classes.control} ${!FormValidity.postalcode?classes.invalid:''}`;
  const cityclass=`${classes.control} ${!FormValidity.city?classes.invalid:''}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameclass}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={Nameref}/>
        {!FormValidity.name && <p>Please enter a name!</p>}
      </div>
      <div className={streetclass}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={Streetref}/>
        {!FormValidity.street && <p>Please enter street!</p>}
      </div>
      <div className={postalcodeclass}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={PostalCoderef}/>
        {!FormValidity.postalcode && <p>Please enter postal-code!</p>}
      </div>
      <div className={cityclass}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={Cityref}/>
        {!FormValidity.city && <p>Please enter city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;