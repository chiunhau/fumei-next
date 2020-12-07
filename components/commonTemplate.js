const { Plus } = require("react-feather");

function CommonTemplate(props) {
  return (
    <div className="common-template">
      <div className="upper" style={{backgroundColor: props.bgColor}}>
        <div className="title" style={{color: props.color || 'var(--dark)'}}>
        {props.title}  
        </div>
        
      </div>
      <div className="lower">
        <span className="cta">{props.cta}</span>
        <div className="icon">
          <Plus size="30px"/>
        </div>
      </div>
    </div>
  )
}

export default CommonTemplate