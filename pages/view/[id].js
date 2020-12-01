import { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useRouter, withRouter } from 'next/router'
import { fetchData } from '../../actions/fetchActions';
import TemplateExport from '../../components/templateExport';

function View(props) {
  const router = useRouter()
  useEffect(() => {
    if(router && router.query && router.query.id) {
      props.fetchAllCategories();
      props.fetchAllDishes();
      props.fetchTemplate(router.query.id);
    }
  }, [router])

  return (
    <div className="page-view">
    {
      props.allDishes &&
      props.allCategories &&
      props.currentTemplate &&
      <div className="container">
        <TemplateExport
          allCategories={props.allCategories}
          allDishes={props.allDishes}
          currentTemplate={props.currentTemplate}
        />
      </div>
    }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  allCategories: state.data['/all_categories'],
  allDishes: state.data['/all_dishes'],
  currentTemplate: state.data[`/templates/${ownProps.router.query.id}`],
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
      id: '/all_dishes'
    }))
  },

  fetchTemplate: (id) => {
    dispatch(fetchData({
      path: `/templates/${id}`,
      id: `/templates/${id}`,
      forceFetch: true
    }))
  },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(View))