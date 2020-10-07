import React from 'react';
import { Menu, X, Edit3, BookOpen, Users, Plus } from 'react-feather';

class DishCard extends React.Component {
  constructor() {
    super()
    this.state = {
      menuIsOpen: false
    }
  }


  render() {
    const { dish, type = 'NORMAL', updateTemplate, categoryID } = this.props;

    switch (type) {
      case 'NORMAL':
        return (
          <div className="dish-card">
            <span className="name">{dish.name}</span>
            <X color="gray" onClick={() => updateTemplate({
              actionType: 'REMOVE',
              payload: {
                category_id: categoryID,
                dish
              }
            })}/>
          </div>
        )
        break;

      case 'EMPTY':
        return (
          <div className="dish-card -empty" onClick={this.props.handleAdd}>
            <Plus color="var(--red)"/>
          </div>
        )
        break;
      
      case 'ADD':
        return (
          <div className="dish-card -add">
            <span className="name">{dish.name}</span>
            <button type="button" className="btn btn-link px-0" onClick={this.props.actionCb}>加入</button>
          </div>
        )
        break;
    
      default:
        return (
          <div className="dish-card" >
            <span className="name">{dish.name}</span>
            <X color="gray"/>
          </div>
        )
        break;
    }
    
  }
}

export default DishCard