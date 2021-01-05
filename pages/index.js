import { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchData } from '../actions/fetchActions';
import {Calendar, Edit3, Search } from 'react-feather';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '../components/header';
import Head from 'next/head'
import CommonTemplate from '../components/commonTemplate';

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
      <Header/>
      <div className="page-index">
      {
        props.templates &&
        <div className="container">
          {/* <h4>建立新菜單</h4>
          <div className="common-templates">
            <CommonTemplate title="空白菜單" cta="建立" bgColor="#ddd"/>
            <CommonTemplate title="4000元" cta="使用範本" bgColor="#ffd166"/>
            <CommonTemplate title="5000元" cta="使用範本" bgColor="#06d6a0"/>
            <CommonTemplate title="6000元" cta="使用範本" bgColor="#118ab2" color="#fff"/>
            <CommonTemplate title="7000元" cta="使用範本" bgColor="#ef476f" color="#fff"/>
            <CommonTemplate title="8000元" cta="使用範本" bgColor="#073b4c" color="#fff"/>
          </div>
          <Link href="/create-common-template"><a>建立新範本</a></Link> */}
          <h4>所有菜單</h4>
          {
            Object.keys(props.templates).map((key, i) => {
              const template = props.templates[key];

              return (
                <div className="template-entry" onClick={() => router.push(`/edit/${key}`)} key={key}>
                  <div className="info">
                    <h4 className="title">{template.name}</h4>
                    <span className="date" style={{display: 'flex', alignItems: 'center'}}>{template.created_date.slice(0, 10)}</span>
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