import React from 'react';
import Card from './card';
import Drawer from './drawer';
import * as R from 'ramda';
import { useEffect, useState } from 'react'
import EdiText from 'react-editext'
import categories from '../pages/categories';
import {Check, Edit2, X } from 'react-feather';
import TemplateHeader from './templateHeader'
const indexMap = R.addIndex(R.map);


function Template(props) {
  const [choicesDrawer, setDrawer] = useState({
    isOpen: false,
  });

  const [templateState, setTemplateState] = useState({});

  const closeDrawer = () => {
    const layout= document.querySelector('body');
    layout.classList.remove('no-touch-scroll');
    setDrawer({isOpen: false})
  }

  const openDrawer = (categoryID) => {
    const layout= document.querySelector('body');
    layout.classList.add('no-touch-scroll');
    setDrawer({isOpen: true, categoryID: categoryID})
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

  const submit = () => {
    props.handleSubmit(templateState)
  }

  const handleSaveTemplateName = (val) => {
    setTemplateState({
      ...templateState,
      name: val
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
    <div className="dish-template">

      {
        props.type !== 'VIEW' &&
        <TemplateHeader templateID={props.templateID} type={props.type}/>
      }
      
      <h3>

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
      {
        props.type !== 'CREATE' &&
        templateState.created_date &&
        <p style={{fontSize: '.9rem', color: 'var(--gray)'}}>建立日期：{templateState.created_date.slice(0, 10)}</p>
      }
      {
        props.type === 'VIEW' &&
        templateState.categories_dishes && 
        <p>共 {R.reduce((acc, val) => acc + val,0, R.map(a => templateState.categories_dishes[a].dishes.length, R.keys(templateState.categories_dishes)))} 道菜</p>
      }
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
                      type={`${props.type === 'VIEW' ? 'VIEW' : 'NORMAL'}`}
                      categoryID={catKey}
                      key={`${catKey}_${dish.id}`}
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
                {
                  category.dishes &&
                  category.dishes.length > 0 &&
                  props.type !== 'VIEW' &&
                  <Card 
                    type={`${props.type === 'VIEW' ? 'VIEW_MORE' : 'MORE'}`}
                    categoryID={catKey}
                    key={`${catKey}_MORE`}
                    cb={() => openDrawer(catKey)}
                  />
                }
                </div>
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
            addDish={addDish}
            addDishWithCustomName={addDishWithCustomName}
            closeDrawer={closeDrawer}
          />
        }
      </ul>
      <hr/>
      {
        props.type !== 'VIEW' && props.type !== 'CREATE' &&
        <button className="btn btn-outline-danger btn-sm" onClick={confirmDelete}>刪除菜單</button>
      }
      {
        props.type !== 'VIEW' &&
        <div className="fixed-bottom">
          <div className="container">
            <button className="btn btn-success btn-block save-template" onClick={submit}>
              {
                props.type === 'CREATE' ?
                '儲存'
                :
                '儲存'
              }
            </button>
          </div>
        
        </div>
      }
      
    </div>
  )
}

export default Template