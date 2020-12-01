import { PlusCircle } from 'react-feather';

function AddMore(props) {
  return (
    <span className={`add-more -${props.mediaQuery}`}>
      <button className="btn" onClick={props.cb}>
          <PlusCircle color="var(--red)" size="1.2rem"/>
      </button>
    </span>
  )
}

export default AddMore