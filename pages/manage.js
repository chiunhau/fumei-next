import { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useRouter, withRouter } from 'next/router'
import { fetchData, updateData, pushData } from '../actions/fetchActions';
import * as R from 'ramda';
import Header from '../components/header';
import {Check, Edit2, X, ChevronDown, ChevronUp, ChevronLeft, MoreVertical, Plus } from 'react-feather';
import {Collapse} from 'react-collapse';
import Modal from 'react-modal';
import { Form, Field } from 'react-final-form'

Modal.setAppElement('#__next');

function Manage(props) {
  const router = useRouter()

  useEffect(() => {
    props.fetchNewAllCategories();
    props.fetchNewAllDishes();
  }, [router])

  return (
    <div className="page-manage">
      <Header 
        title="菜色資料庫"
        showRightIcon={false}
      />
      <div className="container">
        <ManageTemplate 
          allCategories={props.allCategories}
          allDishes={props.allDishes}
          updateDish={props.updateDish}
          createDish={props.createDish}
        />
      </div>
    </div>
  )
}


function ManageTemplate(props) {
  const [someoneIsOpen, setSomeoneIsOpen] = useState(false);
  const [allDishesState, setAllDishesState] = useState({});

  // init allDishesState
  useEffect(() => {
    setAllDishesState(props.allDishes)
  }, [props.allDishes])

  return (
    <div className="manage-template">
      {
        !R.isNil(allDishesState) &&
        !R.isNil(props.allCategories) &&
        Object.keys(props.allCategories).map((catKey, i) => {
          const category = props.allCategories[catKey];
          return (
            <div className="manage-category" key={catKey}>
              <CategoryCollapse title={category.name} count={Object.keys(R.filter(d => d.cat_id === catKey, allDishesState)).length}>
                <ul>
                {
                  Object.keys(R.filter(d => d.cat_id === catKey, allDishesState)).map((dishKey, j) => {
                    const dish = allDishesState[dishKey];
                    return (
                      <ManageCard
                      type="EXISTED"
                      categoryID={catKey}
                      dishID={dishKey} //DANGEROUS
                      dish={dish} 
                      someoneIsOpen={someoneIsOpen}
                      setSomeoneIsOpen={setSomeoneIsOpen}
                      dangerouslyUpdateAllDishesState={data => setAllDishesState({...allDishesState, ...data})}
                      updateDish={props.updateDish}
                      key={dishKey}
                    />
                    )
                  })
                }
                <ManageCard
                  type="NEW"
                  categoryID={catKey}
                  categoryName={category.name}
                  someoneIsOpen={someoneIsOpen}
                  setSomeoneIsOpen={setSomeoneIsOpen}
                  dangerouslyUpdateAllDishesState={data => setAllDishesState({...allDishesState, ...data})}
                  createDish={props.createDish}
                />

                </ul>
              </CategoryCollapse>
            </div>
          )}
        )
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
    props.updateDish(props.dishID, data, () => {
      setCardData(data);
    })
  }

  const handleSubmitCreate = (data) => {
    closeEditBox()
    props.createDish(data, (res) => {
      // console.log(res.path.pieces_[1])
      const newKey = res.path.pieces_[1]
      props.dangerouslyUpdateAllDishesState({[newKey]: data})
      // setCardData(data);
    })
  }
  return (

    <li className={`manage-card ${props.someoneIsOpen && !isEditing ? '-disable' : ''} ${props.type === 'NEW' && '-new'}`}  onClick={openEditBox}>
      {
        !isEditing &&
        props.type === 'EXISTED' &&
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
        !isEditing &&
        props.type === 'NEW' &&
        <div className="display -new">
          <Plus color="var(--red)" size="1.2rem"/>新建 {props.categoryName}
        </div>
      }
      
      {
        isEditing &&
        props.type === 'EXISTED' &&
        <EditBox 
          handleCancel={closeEditBox} 
          handleSubmit={handleSubmit} 
          data={dish}
        />
      }

{
        isEditing &&
        props.type === 'NEW' &&
        <EditBox 
          type='NEW'
          handleCancel={closeEditBox} 
          handleSubmit={handleSubmitCreate}
          data={{cat_id: props.categoryID}}
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
        initialValues={{ name: '', prices: {d: 0}, price_type: 'FIXED', active: true, ...props.data }}
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
                    name="price_type"
                    component="input"
                    type="radio"
                    value="FIXED"
                    className="form-check-input"
                    id="priceType_single"
                  />
                  <label className="form-check-label" htmlFor="priceType_single">固定價格</label>
                </div>
                <div className="form-check form-check-inline">
                  <Field
                    name="price_type"
                    component="input"
                    type="radio"
                    value="BY_SIZE"
                    className="form-check-input"
                    id="priceType_bySize"
                  />
                  <label className="form-check-label" htmlFor="priceType_bySize">多個價格（大小）</label>
                </div>

              </div>
            </div>
            <Condition when="price_type" is="FIXED">
              <div className="form-group">
                <label>單一價格</label>
                <Field
                  name="prices.d"
                  component="input"
                  type="number"
                  placeholder="輸入價格"
                  className="form-control"
                />
              </div>
            </Condition>
            <Condition when="price_type" is="BY_SIZE">
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
  const [isOpened, setIsOpened] = useState(false)
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
  categoriesDishes: state.data['/categories_dishes'],
  allCategories: state.data['/all_categories'],
  allDishes: state.data['/all_dishes'],
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: config => {
    dispatch(fetchData({
      path: '/categories',
      id: '/categories'
    }))
  },

  fetchNewAllCategories: config => {
    dispatch(fetchData({
      path: '/all_categories',
      id: '/all_categories'
    }))
  },

  fetchAllDishes: config => {
    dispatch(fetchData({
      path: '/categories_dishes',
      id: '/categories_dishes'
    }))
  },

  fetchNewAllDishes: config => {
    dispatch(fetchData({
      path: '/all_dishes',
      id: '/all_dishes'
    }))
  },

  fetchEmptyTemplate: () => {
    dispatch(fetchData({
      path: `/default_template`,
      id: `/default_template`,
    }))
  },

  updateDish: (dishID, data, cb) => {
    dispatch(updateData({
      path: `/all_dishes/${dishID}`,
      data,
      cb
    }))
  },

  createDish: (data, cb) => {
    dispatch(pushData({
      path: `/all_dishes/`,
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
  },

  debugPushData: (data) => {
    dispatch(pushData({
      path: `/all_dishes`,
      data
    }))
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manage))