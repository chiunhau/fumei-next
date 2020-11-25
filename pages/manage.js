import { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useRouter, withRouter } from 'next/router'
import { fetchData, updateData, pushData } from '../actions/fetchActions';
import * as R from 'ramda';
import Header from '../components/header';
import {Check, Edit2, X, ChevronDown, ChevronUp, ChevronLeft, MoreVertical } from 'react-feather';
import {Collapse} from 'react-collapse';
import Modal from 'react-modal';
import { Form, Field } from 'react-final-form'


Modal.setAppElement('#__next');

function Manage(props) {
  const router = useRouter()

  useEffect(() => {
    props.fetchCategories();
    props.fetchAllDishes();
    
  }, [router])

  return (
    <div className="page-manage">
      <Header 
        title="菜色資料庫"
        showRightIcon={false}
      />
      <div className="container">
        <ManageTemplate 
          categoriesDishes={props.categoriesDishes}
          updateDish={props.updateDish}
        />
      </div>
      
    </div>
  )
}

function ManageTemplate(props) {
  const [templateState, setTemplateState] = useState({});
  const [someoneIsOpen, setSomeoneIsOpen] = useState(false);
  const initTemplateState = (data) => {
    console.log(data)
    setTemplateState(data)
  }


  useEffect(() => {
    initTemplateState(props.categoriesDishes)
  }, [props.categoriesDishes])

  return (
    <div className="manage-template">
      {
        templateState &&
        templateState.length > 0 &&
        templateState.map((category, i) => (
          <div className="manage-category" key={category.category_name}>
            <CategoryCollapse title={category.category_name} count={category.dishes && category.dishes.length}>
              <ul>            
              {
                category.dishes &&
                category.dishes.map((dish, i) => (
                  <ManageCard
                    categoryID={category.category_id}
                    dishID={i} //DANGEROUS
                    dish={dish} 
                    someoneIsOpen={someoneIsOpen}
                    setSomeoneIsOpen={setSomeoneIsOpen}
                    updateDish={props.updateDish}
                  />
                ))
              }
              </ul>
            </CategoryCollapse>

          </div>
        ))
      }
    </div>
  )
}

function ManageCard(props) {
  const [isEditing, setIsEditing] = useState(false)
  const {dish} = props;
  const [cardData, setCardData] = useState({})

  const initCard = (data) => {
    setCardData(data)
  }

  useEffect(() => {
    initCard(props.dish)
  }, [props.dish])

  const openEditBox = () => {
    if (!props.someoneIsOpen) {
      setIsEditing(true)
     props.setSomeoneIsOpen(true)
    }
    
  }

  const closeEditBox = () => {
    setIsEditing(false)
    props.setSomeoneIsOpen(false)
  }

  const handleSubmit = (data) => {
    closeEditBox()
    props.updateDish(props.categoryID, props.dishID, data, () => {
      setCardData(data);
    })
  }
  return (
    <li className={`manage-card ${props.someoneIsOpen && !isEditing ? '-disable' : ''}`}  onClick={openEditBox}>
      {
        !isEditing &&
        <div className="display">
          <div className={`status ${cardData.active ? '-active' : '-not-active'}`}></div>
          <div className="content">
            <div className="name">{cardData.name}</div>
            <ul className="prices">
              {
                cardData.prices &&
                cardData.priceType === 'bySize' &&
                Object.keys(cardData.prices).map((size, i) => (
                  <li className={`price -size-${size}`}>
                    ${cardData.prices[size]}
                  </li>
                ))
              }
              {
                cardData.prices &&
                cardData.priceType === 'single' &&
                <li className={`price -size-default`}>
                  ${cardData.prices['default']}
                </li>
              }
            </ul>
          </div>
          <Edit2 color="var(--gray)" size="1.2rem"/>
        </div>

      }
      
      {
        isEditing &&
        <EditBox 
          handleCancel={closeEditBox} 
          handleSubmit={handleSubmit} 
          data={dish}
        />

      }
      
    </li>
  )
}

function EditBox(props) {
  const Condition = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is ? children : null)}
    </Field>
  )

  const handleSubmit = (e) => {
    console.log(e);
    props.handleSubmit(e)
  }

  return (
      <Form
        onSubmit={handleSubmit}
        initialValues={{ name: '一條魚', prices: {default: 0}, priceType: 'single', active: true, ...props.data }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} className="edit-box">
          <div className="container">
            <button
                type="button"
                onClick={props.handleCancel}
                className="btn"
                disabled={submitting}
                style={{padding: 0, color: 'var(--red)', display: 'flex', 'alignItems': 'center'}}
              >
                <ChevronLeft/> 取消編輯
              </button>
            <hr/>
            <div className="form-group">
              <label>名稱</label>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="品名"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <div>
                <div className="form-check form-check-inline">
                  <Field
                    name="priceType"
                    component="input"
                    type="radio"
                    value="single"
                    className="form-check-input"
                    id="priceType_single"
                  />
                  <label className="form-check-label" htmlFor="priceType_single">固定價格</label>
                </div>
                <div className="form-check form-check-inline">
                  <Field
                    name="priceType"
                    component="input"
                    type="radio"
                    value="bySize"
                    className="form-check-input"
                    id="priceType_bySize"
                  />
                  <label className="form-check-label" htmlFor="priceType_bySize">多個價格（大小）</label>
                </div>

              </div>
            </div>
            <Condition when="priceType" is="single">
              <div className="form-group">
                <label>單一價格</label>
                <Field
                  name="prices.default"
                  component="input"
                  type="number"
                  placeholder="輸入價格"
                  className="form-control"
                />
              </div>
            </Condition>
            <Condition when="priceType" is="bySize">
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label>小</label>
                    <Field
                      name="prices.s"
                      component="input"
                      type="text"
                      placeholder="輸入價格"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>中</label>
                    <Field
                      name="prices.m"
                      component="input"
                      type="text"
                      placeholder="輸入價格"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>大</label>
                    <Field
                      name="prices.l"
                      component="input"
                      type="text"
                      placeholder="輸入價格"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </Condition>
            <div className="form-group">
              <label>備註</label>
              <Field 
                name="notes" 
                component="textarea" 
                placeholder="Notes"
                className="form-control"
              />
            </div>
            <div className="form-group form-check">
              <Field 
                name="active" 
                component="input" 
                className="form-check-input"
                type="checkbox"/>
              <label>啟用</label>
              
            </div>
            <button type="submit" className="btn btn-success btn btn-block" disabled={submitting}>
              送出
            </button>
              
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </div>
        </form>
      )}
    />
  )
}

function CategoryCollapse(props) {
  const [isOpened, setIsOpened] = useState(true)
  const toggle = () => {
    setIsOpened(!isOpened)
  }
  return (
    <div className="category-collapse">
      <div className="collapse-header" onClick={toggle}>
  <div>{props.title} <span style={{color: 'var(--red)', fontSize:'1rem'}}>({props.count})</span></div>
        
        {
          isOpened ?
          <ChevronUp/>
          :
          <ChevronDown/>
        }
      </div>
      <Collapse isOpened={isOpened}>
       {props.children}
      </Collapse>
    </div>
  )
}


const mapStateToProps = (state, ownProps) => ({
  categories: state.data['/categories'],
  categoriesDishes: state.data['/categories_dishes']
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: config => {
    dispatch(fetchData({
      path: '/categories',
      id: '/categories'
    }))
  },

  fetchAllDishes: config => {
    dispatch(fetchData({
      path: '/categories_dishes',
      id: '/categories_dishes'
    }))
  },

  fetchEmptyTemplate: () => {
    dispatch(fetchData({
      path: `/default_template`,
      id: `/default_template`,
    }))
  },

  updateDish: (categoryID, dishID, data, cb) => {
    dispatch(updateData({
      path: `/categories_dishes/${categoryID}/dishes/${dishID}`,
      data,
      cb
    }))
  },

  pushTemplate: (id, data, cb) => {
    dispatch(pushData({
      path: `/templates`,
      data: {...data, date: new Date().toLocaleDateString()},
      cb
    }))
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manage))