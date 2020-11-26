import { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useRouter, withRouter } from 'next/router'
import { fetchData, updateData, deleteData } from '../../actions/fetchActions';
import Template from '../../components/template_new';

function Edit(props) {
  const router = useRouter()


  useEffect(() => {
    if(router && router.query && router.query.id) {
      console.log(router.query)
      props.fetchAllCategories();
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
              allCategories={props.allCategories}
              allDishes={props.allDishes}
              currentTemplate={props.currentTemplate}
              handleDeleteDish={props.deleteDish}
              handleSubmit={(data) => props.updateTemplate(router.query.id, data, () => {
                alert('儲存成功');
              })}
              templateID={router.query.id}
              handleDelete={() => props.deleteTemplate(router.query.id, () => {
                alert('已刪除');
                router.push('/');
              })}
            />
        
          </div>
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  allCategories: state.data['/all_categories'],
  allDishes: state.data['/all_dishes'],
  template: state.template,
  currentTemplate: state.data[`/templates/${ownProps.router.query.id}`],
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllDishes: config => {
    dispatch(fetchData({
      path: '/all_dishes',
      id: '/all_dishes',
      forceFetch: true
    }))
  },

  fetchAllCategories: config => {
    dispatch(fetchData({
      path: '/all_categories',
      id: '/all_categories'
    }))
  },

  fetchTemplate: (id) => {
    dispatch(fetchData({
      path: `/templates/${id}`,
      id: `/templates/${id}`,
      forceFetch: true
    }))
  },

  updateTemplate: (id, data, cb) => {
    dispatch(updateData({
      path: `/templates/${id}`,
      data,
      cb
    }))
  },

  deleteTemplate: (id, cb) => {
    dispatch(deleteData({
      path: `/templates/${id}`,
      cb
    }))
  },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit))