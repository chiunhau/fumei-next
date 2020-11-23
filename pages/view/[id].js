import { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useRouter, withRouter } from 'next/router'
import { fetchData, updateData } from '../../actions/fetchActions';
import Template from '../../components/template';
import * as R from 'ramda';

function View(props) {
  const router = useRouter()
  useEffect(() => {
    if(router && router.query && router.query.id) {
      console.log(router.query)
      props.fetchCategories();
      props.fetchAllDishes();
      props.fetchTemplate(router.query.id);
    }
    
  }, [router])

  return (
    <div className="page-create">

      {
          props.currentTemplate &&
          <div className="container">
            <Template 
              categoriesDishes={props.currentTemplate.categories_dishes}
              categories={props.categories}
              allDishesNames={props.allDishesNames}
              currentTemplate={props.currentTemplate}
              handleDeleteDish={props.deleteDish}
              handleSubmit={(data) => props.updateTemplate(router.query.id, data)}
              type="VIEW"
            />
          </div>
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  categories: state.data['/categories'],
  template: state.template,
  currentTemplate: state.data[`/templates/${ownProps.router.query.id}`],
  allDishesNames: state.data['/categories_dishes']
});

const mapDispatchToProps = (dispatch) => ({
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

  fetchTemplate: (id) => {
    dispatch(fetchData({
      path: `/templates/${id}`,
      id: `/templates/${id}`,
      forceFetch: true
    }))
  },

  updateTemplate: (id, data) => {
    dispatch(updateData({
      path: `/templates/${id}`,
      data,
      cb: () => alert('儲存成功')
    }))
  },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(View))