import React from 'react';
import DishCard from './dishCard';

class DishTemplate extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }


  render() {
    const {data, openDrawer, updateTemplate} = this.props;
    return (
      <div className="dish-template">
        <ul className="categories">
          {
            data.map((category, i) => (
              <li className="category" key={category.category_id}>
                <div className="header">
                  <span className="number">{i + 1}</span>
                  <span className="name">{category.category_name}</span>
                </div>
                {
                  category.dishes.length > 0 ?
                    category.dishes
                      .map((dish, i) => (
                      <DishCard 
                        dish={dish}
                        type="NORMAL"
                        updateTemplate={updateTemplate}
                        categoryID={category.category_id}
                        key={dish.name}
                      />
                    ))
                  :
                  <DishCard type="EMPTY" handleAdd={() => openDrawer({
                    category: category.category_name,
                    category_id: category.category_id,
                    dishes: [
                      {name: '範例菜1', id: 10}, 
                      {name: '範例菜2', id: 11},
                      {name: '範例菜3', id: 12},
                      {name: '範例菜4', id: 13},
                      {name: '範例菜5', id: 14},
                      {name: '範例菜6', id: 15},
                      {name: '範例菜7', id: 16},
                      {name: '範例菜8', id: 17},
                      {name: '範例菜9', id: 18},
                      {name: '範例菜10', id: 19},
                    ]
                  })} />
                }
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default DishTemplate