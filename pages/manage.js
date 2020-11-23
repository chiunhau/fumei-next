import { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchData } from '../actions/fetchActions';
import {Edit3 } from 'react-feather';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '../components/header';

import * as R from 'ramda';

function Manage(props) {
  useEffect(() => {
    props.fetchAllTemplates();
  }, [])

  const router = useRouter();

  const handleClickEdit = (template) => {
    props.loadTemplate(template)
    router.push('/edit')
  }

  return (
    <div className="layout">
      <Header/>
      <div className="page-manage">
      {
        props.templates &&
        <div className="container">
          {
            Object.keys(props.templates).map((key, i) => {
              const template = props.templates[key];

              return (
                <div className="template-entry">
                  <div className="info">
                    <h4 className="title">{template.name}</h4>
                    <span className="date">{template.date}</span>
                  </div>
                  <Link href={`/edit/${key}`}><a> <Edit3 color="var(--gray)"/></a></Link>
                </div>
              )
            })
          }
        </div>
      }
    </div>
    </div>
  )
}

const mapStateToProps = state => ({
  templates: state.data['/templates'],
});

const mapDispatchToProps = dispatch => ({
  loadTemplate: (template) => {
    dispatch({
      type: 'LOAD_TEMPLATE',
      payload: template
    })
  },
  fetchAllTemplates: config => {
    dispatch(fetchData({
      path: '/templates',
      id: '/templates',
      forceFetch: true
    }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Manage)