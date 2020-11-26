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
            allCategories={props.allCategories}
            allDishes={props.allDishes}
            currentTemplate={props.currentTemplate}
            handleDeleteDish={props.deleteDish}
            handleSubmit={(data) => props.pushTemplate({...data, created_date: new Date().toJSON()}, (res) => {
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
  fetchAllCategories: config => {
    dispatch(fetchData({
      path: '/all_categories',
      id: '/all_categories'
    }))
  },

  fetchAllDishes: config => {
    dispatch(fetchData({
      path: '/all_dishes',
      id: '/all_dishes',
      forceFetch: true
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

  pushTemplate: (data, cb) => {
    dispatch(pushData({
      path: `/templates`,
      data,
      cb
    }))
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Create))