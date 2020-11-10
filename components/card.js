import {X, Plus } from 'react-feather';

function Card(props) {
  switch (props.type) {
    case 'NORMAL':
      return (
        <div className="dish-card">
          <span className="name">{props.dishName}</span>
          <X color="gray" />
        </div>
      )

    case 'EMPTY':
      return (
        <div className="dish-card -empty" onClick={props.handleAdd}>
          <Plus color="var(--red)"/>
        </div>
      )

    case 'ADD':
      return (
        <div className="dish-card -add">
          <span className="name">{props.dishName}</span>
          <button type="button" className="btn btn-link px-0" onClick={props.actionCb}>加入</button>
        </div>
      )
  
    default:
      return (
        <div className="dish-card -empty">
          <Plus color="var(--red)"/>
        </div>
      )
  }
}

export default Card