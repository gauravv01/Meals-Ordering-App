import React , {Fragment} from 'react';
import HeaderCartbutton from './HeaderCartbutton';
import MealsImg from '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = props=>{
    return(
<Fragment>
    <header className={classes.header}> 
        <h1>React Meals</h1>
        <HeaderCartbutton onShow={props.onShow}/>
    </header>
    <div className={classes['main-image']}>
        <img src={MealsImg} alt='A Meals Img' />
    </div>
</Fragment>
)}

export default Header;