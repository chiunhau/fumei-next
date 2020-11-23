import { useEffect, useState } from 'react'
import { ChevronLeft, Share} from 'react-feather';
import { useRouter } from 'next/router'
import Link from 'next/link';

function TemplateHeader(props) {
  const router = useRouter()

  const handleClickBack = (e) => {
    e.preventDefault()
    router.push('/manage')
  }

  const handleClickExport = (e) => {
    e.preventDefault()
    router.push('/manage')
  }

  return (
    <div className="template-header">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div onClick={handleClickBack} className="col-3 text-left" style={{color: 'var(--red)', display: 'flex'}}><ChevronLeft color="var(--red)" size="1.5rem"/><span>返回</span></div>
            <div className="col-6 text-center">
              <h2 className="title">
                {
                  props.type !== 'CREATE' ?
                  '編輯菜單'
                  :
                  '新增菜單'
                }
                
              </h2>
            </div>
            {
              props.type !== 'CREATE' &&
              <div className="col-3 text-right"><a href={`/view/${props.templateID}`} target="_blank"><Share size="1.5rem"/></a></div>
            }
            
          </div>
        </div>
      </div>
  )
}

export default TemplateHeader