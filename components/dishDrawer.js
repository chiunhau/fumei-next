import React from 'react';
import Drawer from 'react-drag-drawer'
import DishCard from './dishCard';

class DishDrawer extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    const {drawerIsOpen, closeDrawer, data, updateTemplate} = this.props;
    return (
      <Drawer
          open={drawerIsOpen}
          onRequestClose={closeDrawer}
          modalElementClass="dishes-drawer"
          containerElementClass="dishes-drawer-container"
        >
          <div className="header">
            選擇{data.category}
          </div>
          <div className="dishes container">
            { 
              data.dishes &&
              data.dishes.map((dish, i) => (
                <DishCard 
                  dish={dish} 
                  type="ADD"
                  actionCb={() => {
                    updateTemplate({
                      actionType: 'ADD',
                      payload: {category_id: data.category_id,dish}
                    });
                    closeDrawer();
                }}
                key={dish.name}
                />
              ))
            }
          </div>
      </Drawer>
    )
  }
}

export default DishDrawer