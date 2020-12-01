import EdiText from 'react-editext';
import { Check, Edit2, X } from 'react-feather';

const EdiTextWrapper = props => {
  return (
    <EdiText
      type="text"
      value={props.value}
      onSave={props.onSave}
      editOnViewClick={true}
      hideIcons={true}
      submitOnEnter={true}
      mainContainerClassName="ediTextContainer"
      editContainerClassName="ediTextEditContainer"
      editButtonContent={<Edit2/>}
      saveButtonContent={<Check/>}
      cancelButtonContent={<X/>}
      editButtonClassName="btn"
      saveButtonClassName="btn btn-outline-success"
      cancelButtonClassName="btn btn-outline-danger"
    />
  )
}

export default EdiTextWrapper