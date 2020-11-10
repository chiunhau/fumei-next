import { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchData } from '../actions/fetchActions';
import Template from '../components/Template';
import * as R from 'ramda';

function Create(props) {
  useEffect(() => {
    props.fetchCategories();
    props.fetchTestTemplate();
    props.fetchAllDishes();
  }, [])

  return (
    <div className="page-create">
      {
          props.testTemplate &&
          <div className="container">
            {props.testTemplate.name}
            <Template 
              categoriesDishes={props.testTemplate.categories_dishes}
              categories={props.categories}
              allDishesNames={props.allDishesNames}
            />
          </div>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  categories: state.data['/categories'],
  testTemplate: state.data['/templates/0'],
  allDishesNames: state.data['/categories_dishes']
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: config => {
    dispatch(fetchData({
      path: '/categories',
      id: '/categories'
    }))
  },
  fetchTestTemplate: config => {
    dispatch(fetchData({
      path: '/templates/0',
      id: '/templates/0'
    }))
  },
  fetchAllDishes: config => {
    dispatch(fetchData({
      path: '/categories_dishes',
      id: '/categories_dishes'
    }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Create)