import { useEffect, useState } from 'react'
import { ChevronLeft, Share} from 'react-feather';
import { useRouter } from 'next/router'

function TemplateHeader(props) {
  const router = useRouter()

  const handleClickBack = (e) => {
    e.preventDefault()
    router.push('/manage')
  }

  return (
    <div className="template-header">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div onClick={handleClickBack} className="col-4 text-left" style={{color: 'var(--red)', display: 'flex'}}><ChevronLeft color="var(--red)" /><span>返回</span></div>
            <div className="col-8 text-right"><Share size={20}/></div>
          </div>
        </div>
      </div>
  )
}

export default TemplateHeader