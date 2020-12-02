import Card from './card';
import Drawer from './drawer';
import * as R from 'ramda';
import { useEffect, useState } from 'react'
import EdiTextWrapper from './templateComponents/ediTextWrapper';
import AddMore from './templateComponents/addMore';
import {Check, Edit2, X, Plus, PlusCircle, Trash2, MinusCircle } from 'react-feather';
import TemplateHeader from './templateHeader'

function Template(props) {
  const [choicesDrawer, setDrawer] = useState({
    isOpen: false
  });

  const [templateState, setTemplateState] = useState({});

  const closeDrawer = () => {
    const layout= document.querySelector('body');
    layout.classList.remove('no-touch-scroll');
    setDrawer({isOpen: false})
  }

  const openDrawer = (categoryID, replaceIndex = -1) => {
    const layout= document.querySelector('body');
    layout.classList.add('no-touch-scroll');
    setDrawer({isOpen: true, categoryID: categoryID, replaceIndex})
  }

  const removeDish = (catID, dishIndex) => {
    const lens = R.lensPath([catID, 'dishes'])
    const removeIndex = R.remove(dishIndex, 1, R.view(lens, templateState.categories_dishes));
    const updated = R.set(lens, removeIndex, templateState.categories_dishes)
    setTemplateState({
      ...templateState,
      categories_dishes: updated
    })
  }

  const addDish = (catID, dishID) => {
    const lens = R.lensPath([catID, 'dishes'])
    const appendDish = R.append({id: dishID}, R.view(lens, templateState.categories_dishes))
    const updated = R.set(lens, appendDish, templateState.categories_dishes)
    setTemplateState({
      ...templateState,
      categories_dishes: updated
    })
  }

  const addDishWithCustomName = (catID, dishID, dishName) => {
    const lens = R.lensPath([catID, 'dishes'])
    const appendDish = R.append({id: dishID, customName: dishName}, R.view(lens, templateState.categories_dishes))
    const updated = R.set(lens, appendDish, templateState.categories_dishes)
    setTemplateState({
      ...templateState,
      categories_dishes: updated
    })
  }

  const replaceDish = (catID, dishID, index) => {
    console.log('replaceDish')
    const lens = R.lensPath([catID, 'dishes'])
    const newArray = R.update(index, {id: dishID}, R.view(lens, templateState.categories_dishes));
    const updated = R.set(lens, newArray, templateState.categories_dishes)
    setTemplateState({
      ...templateState,
      categories_dishes: updated
    })
  }

  const replaceDishWithCustomName = (catID, dishID, dishName, index) => {
    console.log('replaceDish')
    const lens = R.lensPath([catID, 'dishes'])
    const newArray = R.update(index, {id: dishID, customName: dishName}, R.view(lens, templateState.categories_dishes));
    const updated = R.set(lens, newArray, templateState.categories_dishes)
    setTemplateState({
      ...templateState,
      categories_dishes: updated
    })
  }

  const submit = () => {
    props.handleSubmit(templateState)
  }

  const handleSaveTemplateName = (val) => {
    setTemplateState({
      ...templateState,
      name: val
    })
  }

  const handleSaveTemplateNote = (val) => {
    setTemplateState({
      ...templateState,
      note: val
    })
  }

  const handleSaveTemplateTableNum = (val) => {
    setTemplateState({
      ...templateState,
      table_num: val
    })
  }

  const confirmDelete = () => {
    var yes = confirm('確定要刪除嗎？');
    if (yes) {
      props.handleDelete()
    }
  }

  const calculateCounts = () => {
    const flatten = R.flatten(R.reduce(
      (acc, val) => R.append(val, acc), [], R.map(
        a => templateState.categories_dishes[a].dishes || [],
        R.keys(templateState.categories_dishes)
      )))
    return flatten.length
  }

  const calculateSum = () => {
    const flatten = R.flatten(R.reduce(
      (acc, val) => R.append(val, acc), [], R.map(
        a => templateState.categories_dishes[a].dishes || [],
        R.keys(templateState.categories_dishes)
      )))

      return R.reduce((acc, val) => acc + parseInt(props.allDishes[val.id].prices.d), 0, flatten) 
  }

  const calculateGlobalIndex = (catID, indexWithinCat) => {
    const filterEmptyCats = R.filter(c => !R.isEmpty(c.dishes) && !R.isNil(c.dishes), templateState.categories_dishes);
    const flattened = R.flatten(Object.keys(filterEmptyCats).map(key => filterEmptyCats[key].dishes.map((d, i) => (`${key}_${i}`))))

    return R.indexOf(`${catID}_${indexWithinCat}`, flattened)
  }

  const getOptions = catKey => {
    return R.filter(d => d.cat_id === catKey && d.active, props.allDishes)
  }

  // init template onReceive
  useEffect(() => {
    setTemplateState(props.currentTemplate)
  }, [props.currentTemplate])

  // auto save on any change
  useEffect(() => {
    if (props.type === 'EDIT' && !R.isNil(templateState) && !R.isEmpty(templateState) && !R.equals(props.currentTemplate, templateState)) {
      props.handleSubmit(templateState)
    }
  }, [templateState])

  return (
    <div className="dish-template container">
      <TemplateHeader 
        templateID={props.templateID} 
        type={props.type}
        handleSubmit={submit}
      />
      <div className="row">
      <div className="information col-12 col-md-4 col-lg-3">
        <div style={{position: 'sticky', top: '78px'}}>
          <div className="template-summary -setting">
            <div className="title">菜單名稱</div>
            <h3 style={{fontSize: '1.2rem'}}>
              <EdiTextWrapper value={templateState.name} onSave={handleSaveTemplateName} />
            </h3>
            <hr/>
            <div className="title">桌號</div>
            <EdiTextWrapper value={templateState.table_num} onSave={handleSaveTemplateTableNum}/>
            <hr/>
            <div className="title">菜單備註</div>
            <EdiTextWrapper value={templateState.note} onSave={handleSaveTemplateNote}/>
            
          </div>
        {
          !R.isNil(templateState.categories_dishes) &&
          !R.isNil(props.allCategories) &&
          !R.isNil(props.allDishes) &&
            <div className="d-none d-sm-block">
              <div className="template-summary -count">
                <div className="title">已選擇</div>
                <div className="number">{calculateCounts()}<span> 道</span></div>
              </div>
              <div className="template-summary -price">
                <div className="title">總價約</div>
                <div className="number">${calculateSum()}<span> 元</span></div>
              </div>
              <hr/>
              {
                props.type === 'EDIT' && 
                <button className="btn btn-block btn-sm btn-danger" onClick={confirmDelete}><Trash2 size="1rem"/> 刪除菜單</button>
              } 
            </div>
        }
        </div>
      </div>
      
      <div className="template-area col-12 col-md-8 col-lg-9">
        <ul className="categories">
          {
            !R.isNil(templateState.categories_dishes) &&
            !R.isNil(props.allCategories) &&
            !R.isNil(props.allDishes) &&
            Object.keys(templateState.categories_dishes).map((catKey, i) => {
              const category = templateState.categories_dishes[catKey];
              return (
                <li className="category" key={i}>
                  <div className="header">
                    <h4 className="name">{props.allCategories[catKey].name}</h4>
                  </div>
                  <div className="cards">
                  {
                    category.dishes &&
                    category.dishes.length > 0 ?
                    category.dishes.map((dish, j) => (
                      <Card 
                        dishID={dish.id}
                        dishName={dish.customName || props.allDishes[dish.id].name || '找不到名稱'}
                        prices={props.allDishes[dish.id].prices}
                        number={calculateGlobalIndex(catKey, j) + 1 || 0}
                        type="NORMAL"
                        categoryID={catKey}
                        openDrawerToReplaceDish={() => openDrawer(catKey, j)}
                        key={`${catKey}_${dish.id}_${dish.customName}`}
                        removeDish={() => removeDish(catKey, j)}
                      />
                    ))
                    :
                    <Card 
                      type="EMPTY"
                      categoryID={catKey}
                      key={`${catKey}_EMPTY`}
                      categoryName={props.allCategories[catKey].name}
                      cb={() => openDrawer(catKey)}
                    />
                  }
                  </div>
                  {
                    category.dishes &&
                    category.dishes.length > 0 ?
                    <AddMore 
                      mediaQuery="sm"
                      categoryID={catKey}
                      key={`${catKey}_MORE`}
                      cb={() => openDrawer(catKey)}
                    />
                    :
                    <div className="add-more-placeholder"></div>
                  }
                </li>
              )
            })
          }
          {
            choicesDrawer.isOpen &&
            props.allDishes &&
            <Drawer 
              categoryID={choicesDrawer.categoryID}
              categoryName={props.allCategories[choicesDrawer.categoryID].name}
              categoryDishes={getOptions(choicesDrawer.categoryID)}
              C01OptionsDishes={getOptions('-C01-OPTIONS')}
              C07OptionsDishes={getOptions('-C07-OPTIONS')}
              C07MethodsDishes={getOptions('-C07-METHODS')}
              addDish={addDish}
              addDishWithCustomName={addDishWithCustomName}
              replaceDish={replaceDish}
              replaceDishWithCustomName={replaceDishWithCustomName}
              closeDrawer={closeDrawer}
              replaceIndex={choicesDrawer.replaceIndex}
            />
          }
        </ul>
        <div class="alert alert-success template-bottom-summary d-block d-sm-none" role="alert">
          已選擇 <span className="highlight">{calculateCounts()}</span> 道菜，約 <span className="highlight">{calculateSum()} 元</span>&nbsp;
        </div>
        {
          props.type === 'EDIT' && 
          <button className="btn btn-sm btn-danger d-block d-sm-none" onClick={confirmDelete}><Trash2 size="1rem"/> 刪除菜單</button>
        } 
      </div>  
      {/* {
        !R.isNil(templateState.categories_dishes) &&
        !R.isNil(props.allCategories) &&
        !R.isNil(props.allDishes) &&
        <div className="fixed-bottom">
          <div className="container">  
            <p className="template-bottom-summary">已選擇 <span className="highlight">{calculateCounts()}</span> 道菜，約 <span className="highlight">{calculateSum()} 元</span>&nbsp;</p>
          </div>
        </div>
      } */}
      </div>
    </div>
  )
}

export default Template