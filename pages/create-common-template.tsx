import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useRouter, withRouter } from 'next/router'
import { fetchData, updateData, pushData } from '../actions/fetchActions';
import Template from '../components/template';
import * as R from 'ramda';

type Props = {
  currentTemplate: object,
  allCategories: object,
  allDishes: object,
  deleteDish: () => void,
  pushTemplate: (data:object, cb: (res: object) => void) => void,
  fetchAllCategories: () => void,
  fetchAllDishes: () => void,
  fetchEmptyTemplate: () => void,
}

const CreateCommonTemplate: React.FC<Props> = (props) => {
  const router = useRouter()
  React.useEffect(() => {
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
            categoriesDishes={R.prop('categories_dishes', props.currentTemplate)}
            allCategories={props.allCategories}
            allDishes={props.allDishes}
            currentTemplate={props.currentTemplate}
            handleDeleteDish={props.deleteDish}
            handleSubmit={(data) => props.pushTemplate({...data, created_date: new Date().toJSON()}, (res) => {
              alert('新增成功');
              router.push(`/edit/${R.path(['path', 'pieces_', 1], res)}`) //DANGEROUS
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
  allCategories: state.data['/all_categories'],
  allKeywords: state.data['/keywords']
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

  fetchKeywords: () => {
    dispatch(fetchData({
      path: `/keywords`,
      id: `/keywords`,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateCommonTemplate))