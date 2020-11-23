import { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useRouter, withRouter } from 'next/router'
import { fetchData, updateData, pushData } from '../actions/fetchActions';
import Template from '../components/template';
import * as R from 'ramda';

function Create(props) {
  const router = useRouter()
  useEffect(() => {
    props.fetchCategories();
    props.fetchAllDishes();
    props.fetchEmptyTemplate();
    
  }, [])

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
      data: {...data, date: new Date().toLocaleDateString()},
      cb
    }))
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Create))