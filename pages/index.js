import { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchData } from '../actions/fetchActions';
import {Calendar, Edit3, Search } from 'react-feather';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '../components/header';
import Head from 'next/head'

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
    <div className="">
      {/* <Head>
        <title>富美配菜系統</title>
      </Head> */}
      <Header/>
      <div className="page-manage">
      {
        props.templates &&
        <div className="container">
          {
            Object.keys(props.templates).map((key, i) => {
              const template = props.templates[key];

              return (
                <div className="template-entry" onClick={() => router.push(`/edit/${key}`)} key={key}>
                  <div className="info">
                    <h4 className="title">{template.name}</h4>
                    <span className="date" style={{display: 'flex', alignItems: 'center'}}><Calendar size="1rem" />&nbsp;{template.created_date.slice(0, 10)}</span>
                  </div>
                  <div className="actions">
                    {/* <Search color="var(--red)"/> */}
                    <Edit3 color="var(--red)"/>
                  </div>
                  
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