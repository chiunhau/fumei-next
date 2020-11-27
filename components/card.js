import {X, Plus, MoreHorizontal, PlusCircle, Trash2 } from 'react-feather';

function Card(props) {
  switch (props.type) {
    case 'NORMAL':
      return (
        <div className="dish-card -normal">
          <div className="name">{props.dishName}</div>
          <Trash2 color="var(--gray)" size="1rem" onClick={() => props.removeDish(props.categoryID, props.dishID)} style={{minWidth: '20px'}}/>
        </div>
      )

    case 'VIEW':
      return (
        <div className="dish-card -view">
          <span className="name">{props.dishName}</span>
          {/* <X color="var(--red)" size="20px" onClick={() => props.removeDish(props.categoryID, props.dishID)} style={{minWidth: '20px'}}/> */}
        </div>
      )

    case 'EMPTY':
      return (
        <div className="dish-card -empty" onClick={props.cb}>
          <Plus color="var(--red)" size="1rem"/>
        <span>加入{props.categoryName}</span>
        </div>
      )

    case 'MORE':
      return (
        <div className="dish-card -more" onClick={props.cb}>
          <Plus color="var(--red)" size="1rem"/>
          <span>加入更多</span>
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
        <div className="dish-card -add"  onClick={() => props.cb(props.categoryID, props.dishID)}>
          <span className="name">{props.dishName}</span>
          <span className="select">加入</span>
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