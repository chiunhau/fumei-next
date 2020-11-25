import {X, Plus, ChevronLeft } from 'react-feather';
import Card from './card';
import * as R from 'ramda';

function Drawer(props) {
  const {
    categoryID,
    categoryName,
    categoryDishes,
    closeDrawer,
    addDish
  } = props;

  return (
    <div className="choices-drawer">
      <div className="click" onClick={closeDrawer}></div>
      <div className="drawer-container">
        <div className="header">
          <div className="clickable d-flex align-items-center">
            <ChevronLeft onClick={closeDrawer}/>
            <span onClick={closeDrawer}>所有{categoryName} </span> 
          </div>
        </div>
        <div className="content">
          <div className="dishes">
            { 
              !R.isNil(categoryDishes) &&
              Object.keys(categoryDishes).map((dishKey, i) => {
                const dish = categoryDishes[dishKey];
                return (
                  <Card 
                    dishName={dish.name} 
                    categoryID={categoryID}
                    dishID={dishKey}
                    type="ADD"
                    cb={(a, b) => {
                      addDish(a, b);
                      closeDrawer();
                    }}
                    key={dishKey}
                  />
                )
              })
            }
          </div>
        </div>
       
      </div>
  </div>
  )
}

export default Drawer