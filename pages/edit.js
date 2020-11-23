import { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { fetchData } from '../actions/fetchActions';
import Template from '../components/template';
import EdiText from 'react-editext'
import * as R from 'ramda';

function Edit(props) {
  useEffect(() => {
    props.fetchCategories();
    props.fetchAllDishes();
    
    if (!props.template) {
      props.fetchTemplate(0);
    }
    
  }, [])

  return (
    <div className="page-create">
      {
          props.template &&
          <div className="container">
            {/* {props.template.name} */}
            <Template 
              categoriesDishes={props.template.categories_dishes}
              categories={props.categories}
              allDishesNames={props.allDishesNames}
              handleDeleteDish={props.deleteDish}
            />
          </div>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  categories: state.data['/categories'],
  template: state.template,
  allDishesNames: state.data['/categories_dishes']
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: config => {
    dispatch(fetchData({
      path: '/categories',
      id: '/categories'
    }))
  },

  fetchAllDishes: config => {
    dispatch(fetchData({
      path: '/categories_dishes',
      id: '/categories_dishes'
    }))
  },
  fetchTemplate: id => {
    dispatch(fetchData({
      path: `/template/${id}`,
      id: '/template',
      forceFetch: true
    }))
  },
  deleteDish: (categoryID, dishID) => {
    dispatch({type: 'REMOVE_DISH', payload: {
      categoryID, dishID
    }})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit)