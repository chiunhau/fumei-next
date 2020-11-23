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
    categoryID: 0
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
    const updated = R.set(lens, [dishID], templateState.categories_dishes)
    console.log(updated)
    setTemplateState({
      ...templateState,
      categories_dishes: updated
    })
  }

  const submit = () => {
    props.handleSubmit(templateState)
    console.log(templateState)
  }

  const handleSaveTemplateName = (val) => {
    setTemplateState({
      ...templateState,
      name: val
    })
  }


  useEffect(() => {
    console.log('init template states')
    console.log(props.categoriesDishes)
    initTemplateState(props.currentTemplate)
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
      <ul className="categories">
        {
          templateState.categories_dishes &&
          props.categories &&
          props.allDishesNames &&
          indexMap((category, i) => (
            <li className="category" key={i}>
              <div className="header">
                {/* <span className="number">{i + 1}</span> */}
                <h4 className="name">{props.categories[i]}</h4>
              </div>
              {
                category.dishes &&
                category.dishes.length > 0 ?
                indexMap((dish, j) => (
                  <Card 
                  dishID={dish}
                  dishName={R.path([category.category_id, 'dishes', dish, 'name'], props.allDishesNames)}
                  type={`${props.type === 'VIEW' ? 'VIEW' : 'NORMAL'}`}
                  categoryID={category.category_id}
                  key={`${category.category_id}_${dish}`}
                  removeDish={() => removeDish(category.category_id, j)}
                />
                ), category.dishes)
                :
                <Card 
                  type={`${props.type === 'VIEW' ? 'VIEW_EMPTY' : 'EMPTY'}`}
                  categoryID={category.category_id}
                  key={`${category.category_id}_EMPTY`}
                  cb={() => openDrawer(category.category_id)}
                />
              }
            </li>
          ), templateState.categories_dishes)
        }
        {
          choicesDrawer.isOpen &&
          props.allDishesNames &&
          <Drawer 
            categoryID={choicesDrawer.categoryID}
            categoryName={props.categories[choicesDrawer.categoryID]}
            categoryDishes={props.allDishesNames[choicesDrawer.categoryID].dishes}
            addDish={addDish}
            closeDrawer={closeDrawer}
          />
        }
      </ul>
      <hr/>
      {
        props.type !== 'VIEW' &&
        <button className="btn btn-success btn-block save-template" onClick={submit}>
          {
            props.type === 'CREATE' ?
            '新增'
            :
            '儲存'
          }
        </button>
      }
      
    </div>
  )
}

export default Template