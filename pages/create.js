import { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useRouter, withRouter } from 'next/router'
import { fetchData, updateData, pushData } from '../actions/fetchActions';
import Template from '../components/template_new';
import * as R from 'ramda';

function Create(props) {
  const router = useRouter()
  useEffect(() => {
    props.fetchAllCategories();
    props.fetchNewAllDishes();
    props.fetchEmptyTemplate();
    
  }, [])

  return (
    <div className="page-create">
      {
        props.currentTemplate &&
        <div className="container">
          <Template 
            categoriesDishes={props.currentTemplate.categories_dishes}
            allCategories={props.allCategories}
            allDishes={props.allDishes}
            currentTemplate={props.currentTemplate}
            handleDeleteDish={props.deleteDish}
            handleSubmit={(data) => props.pushTemplate(new Date().toISOString().slice(0, 19), data, (res) => {
              alert('新增成功');
              router.push(`/edit/${res.path.pieces_[1]}`) //DANGEROUS
            })}
            type="CREATE"
          />
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  categories: state.data['/categories'],
  currentTemplate: state.data[`/default_template`],
  allDishesNames: state.data['/categories_dishes'],
  allDishes: state.data['/all_dishes'],
  allCategories: state.data['/all_categories']
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

  fetchAllCategories: config => {
    dispatch(fetchData({
      path: '/all_categories',
      id: '/all_categories'
    }))
  },

  fetchNewAllDishes: config => {
    dispatch(fetchData({
      path: '/all_dishes',
      id: '/all_dishes'
    }))
  },

  fetchEmptyTemplate: () => {
    dispatch(fetchData({
      path: `/default_template`,
      id: `/default_template`,
    }))
  },

  updateTemplate: (id, data) => {
    dispatch(updateData({
      path: `/templates/${id}`,
      data,
      cb: () => alert('儲存成功')
    }))
  },

  pushTemplate: (id, data, cb) => {
    dispatch(pushData({
      path: `/templates`,
      data,
      cb
    }))
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Create))