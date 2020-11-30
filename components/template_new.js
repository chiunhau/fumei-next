import React from 'react';
import Card from './card';
import Drawer from './drawer';
import * as R from 'ramda';
import { useEffect, useState } from 'react'
import EdiText from 'react-editext'
import categories from '../pages/categories';
import {Check, Edit2, X, Plus, PlusCircle, Trash2, MinusCircle } from 'react-feather';
import TemplateHeader from './templateHeader'
const indexMap = R.addIndex(R.map);


function Template(props) {
  const [choicesDrawer, setDrawer] = useState({
    isOpen: false,
    // categoryID: '-C07'
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

  const initTemplateState = data => {
    setTemplateState(data)
  }

  const removeDish = (catID, dishIndex) => {
    const lens = R.lensPath([catID, 'dishes'])
    const removeIndex = R.remove(dishIndex, 1, R.view(lens, templateState.categories_dishes));
    const updated = R.set(lens, removeIndex, templateState.categories_dishes)
    console.log(updated)
    setTemplateState({
      ...templateState,
      categories_dishes: updated
    })
  }

  const addDish = (catID, dishID) => {
    const lens = R.lensPath([catID, 'dishes'])
    const appendDish = R.append({id: dishID}, R.view(lens, templateState.categories_dishes))
    const updated = R.set(lens, appendDish, templateState.categories_dishes)
    console.log(updated)
    setTemplateState({
      ...templateState,
      categories_dishes: updated
    })
  }

  const addDishWithCustomName = (catID, dishID, dishName) => {
    const lens = R.lensPath([catID, 'dishes'])
    const appendDish = R.append({id: dishID, customName: dishName}, R.view(lens, templateState.categories_dishes))
    const updated = R.set(lens, appendDish, templateState.categories_dishes)
    console.log(updated)
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
    // console.log(calculateSum())
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

  const confirmDelete = () => {
    var yes = confirm('確定要刪除嗎？');
    if (yes) {
      props.handleDelete()
    }
  }

  const flattenKeyVals = (obj, innerKey) => {
    return R.map(k => k.dishes, R.keys(obj))
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

  useEffect(() => {
    console.log('init template states')
    console.log(props.categoriesDishes)
    if (props.type === 'VIEW') {
      console.log('view')
      const filterEmptyCats = R.filter(c => !R.isEmpty(c.dishes) && !R.isNil(c.dishes), props.currentTemplate.categories_dishes);
      initTemplateState({...props.currentTemplate, categories_dishes: filterEmptyCats })
    }
    else {
      initTemplateState(props.currentTemplate)
    }
    
  }, [props.currentTemplate])

  return (
    <div className="dish-template container">
      {
          props.type !== 'VIEW' &&
          <TemplateHeader templateID={props.templateID} type={props.type}/>
        }
      <div className="row">
      <div className="information col-12 col-md-4 col-lg-3">
        <div style={{position: 'sticky', top: '78px'}}>
        
        <div className="template-summary -setting">
          <div className="title">菜單設定</div>
        <h3 style={{fontSize: '1.3rem'}}>

        {
          props.type !== 'VIEW' ?
          <EdiText
          type="text"
          value={templateState.name}
          onSave={handleSaveTemplateName}
          editOnViewClick={true}
          // submitOnUnfocus={true}
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
        : templateState.name

        }

        </h3>

        {/* <p> */}
        <div className="notes-wrapper d-flex">
        <span style={{fontSize: '0.9rem', color: 'var(--gray)'}}>備註：</span>
        {
          props.type !== 'VIEW' ?
          <EdiText
          type="text"
          value={templateState.note}
          onSave={handleSaveTemplateNote}
          editOnViewClick={true}
          // submitOnUnfocus={true}
          hideIcons={true}
          submitOnEnter={true}
          mainContainerClassName="ediTextContainer"
          editContainerClassName="ediTextEditContainer"
          editButtonContent={<Edit2 size="0.9rem"/>}
          saveButtonContent={<Check/>}
          cancelButtonContent={<X/>}
          editButtonClassName="btn"
          saveButtonClassName="btn btn-outline-success"
          cancelButtonClassName="btn btn-outline-danger"
        />
        : templateState.note

        }
        </div>

        {/* {
        props.type !== 'CREATE' &&
        templateState.created_date &&
        <p style={{fontSize: '.9rem', color: 'var(--gray)'}}>建立：{templateState.created_date.slice(0, 10)}</p>
        } */}
        {
        props.type === 'VIEW' &&
        templateState.categories_dishes && 
        <p>共 {calculateCounts()} 道菜，約 {calculateSum()} 元</p>
        }
        </div>
        
        {
        props.type !== 'VIEW' &&
        !R.isNil(templateState.categories_dishes) &&
        !R.isNil(props.allCategories) &&
        !R.isNil(props.allDishes) &&
          <div className="">
            <div className="template-summary -count">
              <div className="title">已選擇</div>
              <div className="number">{calculateCounts()}<span> 道</span></div>
            </div>

            <div className="template-summary -price">
              <div className="title">總價約</div>
              <div className="number">${calculateSum()}<span> 元</span></div>
            </div>
              {/* <p className="template-summary">已選擇 <span className="highlight">{calculateCounts()}</span> 道菜，<br/>約 <span className="highlight">{calculateSum()} 元</span>&nbsp;</p> */}
            <button className="btn btn-success btn-block save-template" onClick={submit}>
              {
                props.type === 'CREATE' ?
                '儲存'
                :
                '儲存'
              }
            </button>
            {
              props.type !== 'CREATE' &&
              <button className="btn btn-block btn-outline-danger" onClick={confirmDelete}>刪除菜單</button>
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
              // (props.type !== 'VIEW' || (props.type === 'VIEW' && category.dishes && category.dishes.length > 0)) &&
              <li className="category" key={i}>
                {
                    props.type !== 'VIEW' &&
                  <div className="header">
                    {/* <span className="number">{i+1}</span> */}
                    <h4 className="name">{props.allCategories[catKey].name}</h4>
                  </div>
                }
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
                      type={`${props.type === 'VIEW' ? 'VIEW' : 'NORMAL'}`}
                      categoryID={catKey}
                      openDrawerToReplaceDish={() => openDrawer(catKey, j)}
                      key={`${catKey}_${dish.id}_${dish.customName}`}
                      removeDish={() => removeDish(catKey, j)}
                    />
                  ))
                  :
                  <Card 
                    type={`${props.type === 'VIEW' ? 'VIEW_EMPTY' : 'EMPTY'}`}
                    categoryID={catKey}
                    key={`${catKey}_EMPTY`}
                    categoryName={props.allCategories[catKey].name}
                    cb={() => openDrawer(catKey)}
                  />
                }
                {/* {
                  category.dishes &&
                  category.dishes.length > 0 &&
                  props.type !== 'VIEW' &&
                  <AddMore
                    mediaQuery="xs"
                    categoryID={catKey}
                    key={`${catKey}_MORE`}
                    cb={() => openDrawer(catKey)}
                  />
                } */}
                
                </div>
                {
                  category.dishes &&
                  category.dishes.length > 0 &&
                  props.type !== 'VIEW' ?
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
            categoryDishes={
              R.filter(
                d => d.cat_id === choicesDrawer.categoryID && d.active, 
                props.allDishes
              )}
            C01OptionsDishes={
              R.filter(
                d => d.cat_id === '-C01-OPTIONS' && d.active, 
                props.allDishes
              )}
            C07OptionsDishes={
              R.filter(
                d => d.cat_id === '-C07-OPTIONS' && d.active, 
                props.allDishes
              )}
            C07MethodsDishes={
              R.filter(
                d => d.cat_id === '-C07-METHODS' && d.active, 
                props.allDishes
              )}
            addDish={addDish}
            addDishWithCustomName={addDishWithCustomName}
            replaceDish={replaceDish}
            replaceDishWithCustomName={replaceDishWithCustomName}
            closeDrawer={closeDrawer}
            replaceIndex={choicesDrawer.replaceIndex}
          />
        }
      </ul>
      
      </div>  
      {/* {
        props.type !== 'VIEW' &&
        !R.isNil(templateState.categories_dishes) &&
        !R.isNil(props.allCategories) &&
        !R.isNil(props.allDishes) &&
        <div className="fixed-bottom">
          <div className="container">  
            <div className="d-flex justify-content-end align-items-center">
      <p className="text-right template-summary">已選擇 <span className="highlight">{calculateCounts()}</span> 道菜，約 <span className="highlight">{calculateSum()} 元</span>&nbsp;</p>
              <button className="btn btn-success save-template" onClick={submit}>
                {
                  props.type === 'CREATE' ?
                  '儲存'
                  :
                  '儲存'
                }
              </button>
              
            </div>
          </div>
        </div>
      } */}
      
      </div>
    </div>
  )
}

export default Template

function AddMore(props) {
  return (
    <span className={`add-more -${props.mediaQuery}`}>
      <button className="btn" onClick={props.cb}>
          <PlusCircle color="var(--red)" size="1.2rem"/>
          {/* <div style={{color: 'var(--red)', textDecoration: 'underline', fontSize: '15px'}}>+更多</div> */}
      </button>
    </span>
  )
}