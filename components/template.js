import React from 'react';
import Card from './Card';
import * as R from 'ramda';
const indexMap = R.addIndex(R.map);


function Template(props) {
  return (
    <div className="dish-template">
      <ul className="categories">
        {
          props.categoriesDishes &&
          props.categories &&
          props.allDishesNames &&
          indexMap((category, i) => (
            <li className="category">
              <div className="header">
                <span className="number">{i + 1}</span>
                <span className="name">{props.categories[i]}</span>
              </div>
              {
                category.dishes &&
                category.dishes.length > 0 ?
                indexMap((dish, j) => (
                  <Card 
                  dishID={dish}
                  dishName={R.path([category.category_id, 'dishes', dish, 'name'], props.allDishesNames)}
                  type="NORMAL"
                  categoryID={category.category_id}
                  key={`${category.category_id}_${dish}`}
                />
                ), category.dishes)
                :
                <Card 
                  type="EMPTY"
                  categoryID={category.category_id}
                  key={`${category.category_id}_ENPTY`}
                />
              }
            </li>
          ), props.categoriesDishes)
        }
      </ul>
    </div>
  )
}

export default Template