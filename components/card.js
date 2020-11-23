import {X, Plus } from 'react-feather';

function Card(props) {
  switch (props.type) {
    case 'NORMAL':
      return (
        <div className="dish-card">
          <span className="name">{props.dishName}</span>
          <X color="var(--gray)" size="1.4rem" onClick={() => props.removeDish(props.categoryID, props.dishID)} style={{minWidth: '20px'}}/>
        </div>
      )

    case 'VIEW':
      return (
        <div className="dish-card">
          <span className="name">{props.dishName}</span>
          {/* <X color="var(--red)" size="20px" onClick={() => props.removeDish(props.categoryID, props.dishID)} style={{minWidth: '20px'}}/> */}
        </div>
      )

    case 'EMPTY':
      return (
        <div className="dish-card -empty" onClick={props.cb}>
          <Plus color="var(--red)" size="1.4rem"/>
        </div>
      )

      case 'VIEW_EMPTY':
        return (
          <div className="dish-card -view-empty" onClick={props.cb}>
            (無)
          </div>
        )

    case 'ADD':
      return (
        <div className="dish-card -add">
          <span className="name">{props.dishName}</span>
          <button type="button" className="btn btn-link px-0" onClick={() => props.cb(props.categoryID, props.dishID)}>加入</button>
        </div>
      )
  
    default:
      return (
        <div className="dish-card -empty">
          <Plus color="var(--gray)"/>
        </div>
      )
  }
}

export default Card