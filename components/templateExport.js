import * as R from 'ramda';

function TemplateExport(props) {
  const flattenDishes = () => {
    const categoriesDishes = props.currentTemplate.categories_dishes
    return R.flatten(R.map(catKey => categoriesDishes[catKey].dishes || [], R.keys(categoriesDishes)))
  }

  const getDishName = (dish) => {
    return dish.customName || props.allDishes[dish.id].name || '找不到名稱'
  }

  const getTemplateName = () => {
    return props.currentTemplate.name || '找不到菜單名稱'
  }

  const getTemplateNote = () => {
    return props.currentTemplate.note || '無備註'
  }

  const getTemplateTableNum = () => {
    return props.currentTemplate.table_num || '無桌號'
  }

  const getTemplateLength = () => {
    return flattenDishes().length
  }

  return (
    <div className="template-export">
      <h3>{getTemplateName()}</h3>
      <p>備註：{getTemplateNote()}</p>
      <p>桌號：{getTemplateTableNum()}</p>
      <ol>
      {
        flattenDishes()
          .map((d, i) => (
            <li key={`${d.id}_${d.i}`}> {getDishName(d)}</li>
          )) 
      }
      </ol>
    </div>
  )
}

export default TemplateExport