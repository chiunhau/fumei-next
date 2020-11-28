import {X, Plus, ChevronLeft } from 'react-feather';
import Card from './card';
import * as R from 'ramda';
import {useEffect, useState} from 'react';

function Drawer(props) {
  const {
    categoryID,
    categoryName,
    categoryDishes,
    closeDrawer,
    addDish,
    addDishWithCustomName,
    C01OptionsDishes,
    C07OptionsDishes,
    C07MethodsDishes,

  } = props;

  return (
    <div className="choices-drawer">
      <div className="click" onClick={closeDrawer}></div>
      <div className="drawer-container">
        <div className="header">
          <div className="clickable d-flex align-items-center">
            <ChevronLeft onClick={closeDrawer}/>
            <span onClick={closeDrawer}>所有{categoryName} </span> 
          </div>
        </div>
        {
          categoryID === '-C01' ?
          <C01Panel 
            categoryID={categoryID}
            categoryDishes={categoryDishes}
            closeDrawer={closeDrawer}
            addDish={addDish}
            addDishWithCustomName={addDishWithCustomName}
            C01OptionsDishes={C01OptionsDishes}
          />
          : categoryID === '-C07' ?
          <C07Panel 
            categoryID={categoryID}
            categoryDishes={categoryDishes}
            closeDrawer={closeDrawer}
            addDish={addDish}
            addDishWithCustomName={addDishWithCustomName}
            C07OptionsDishes={C07OptionsDishes}
            C07MethodsDishes={C07MethodsDishes}
          />

          :
          <div className="content">
          <div className="dishes">
            { 
              !R.isNil(categoryDishes) &&
              Object.keys(categoryDishes).map((dishKey, i) => {
                const dish = categoryDishes[dishKey];
                return (
                  <Card 
                    dishName={dish.name} 
                    categoryID={categoryID}
                    dishID={dishKey}
                    type="ADD"
                    cb={(a, b) => {
                      addDish(a, b);
                      closeDrawer();
                    }}
                    key={dishKey}
                  />
                )
              })
            }
          </div>
        </div>

        }
        
       
      </div>
  </div>
  )
}

export default Drawer

function C01Panel(props) {
  const [activeTab, setActiveTab] = useState(0);
  const [optionDishes, setOptionDishes] = useState({});

  useEffect(() => {
    setOptionDishes(R.map((d) => ({...d, isSelected: false}), props.C01OptionsDishes))
  }, [props.C01OptionsDishes])

  const toggleOption = key => {
    const option = optionDishes[key]
    setOptionDishes({...optionDishes, [key]: {...option, isSelected: !option.isSelected}})
  }


  const {
    categoryID,
    categoryDishes,
    closeDrawer,
    addDish,
    addDishWithCustomName,
    C01OptionsDishes
  } = props;

  return (
    <div className="-C01-panel">
      <div className="panel-tabs">
        <div className={`panel-tab ${activeTab === 0 ? '-active' : ''}`} onClick={() => setActiveTab(0)}>自由搭配</div>
        <div className={`panel-tab ${activeTab === 1 ? '-active' : ''}`} onClick={() => setActiveTab(1)}>常用</div>
      </div>
      <div className="panel-workspace">
        {
          activeTab === 1 ?
          <div className="combined">
            <div className="dishes">
            { 
              !R.isNil(categoryDishes) &&
              Object.keys(categoryDishes).map((dishKey, i) => {
                const dish = categoryDishes[dishKey];
                return (
                  <Card 
                    dishName={dish.name} 
                    categoryID={categoryID}
                    dishID={dishKey}
                    type="ADD"
                    cb={(a, b) => {
                      addDish(a, b);
                      closeDrawer();
                    }}
                    key={dishKey}
                  />
                )
              })
            }
            </div>
          </div>
          :
          <div className="free">
            1. 任選多個食材：
            <ul className="options">
            { 
              !R.isNil(optionDishes) &&
              Object.keys(optionDishes).sort().map((dishKey, i) => {
                const dish = optionDishes[dishKey];
                return (
                  <OptionCard 
                    dishName={dish.name} 
                    categoryID={categoryID}
                    dishID={dishKey}
                    key={dishKey}
                    isSelected={dish.isSelected}
                    handleToggle={() => toggleOption(dishKey)}
                  />
                )
              })
            }
            </ul>
            <hr/>
            {
              makeNamesArray(optionDishes) &&
              makeNamesArray(optionDishes).length > 0 &&
              <div className="">
                <div style={{marginBottom: '12px'}}>2. 完成組合後點選右方加入：</div>
                
                <Card 
                  type="ADD"
                  dishName={printArray(makeNamesArray(optionDishes))}
                  categoryID="-C01"
                  dishID="-C01-CUSTOM-OPTIONS-DISH"
                  mergedOptionsArray={makeNamesArray(optionDishes)}
                  cb={(a, b) => {
                    // addDish(a, b);
                    addDishWithCustomName(a, b, printArray(makeNamesArray(optionDishes)))
                    // console.log(a, b)
                    closeDrawer();
                  }}
                />
              </div>
            }
            
            

          </div>
        }
      </div>

    </div>
  )
}

const filterSelectedOptions = obj => {
  return R.filter(d => d.isSelected, obj)
}

const makeNamesArray = obj => {
  const filtered = filterSelectedOptions(obj)
  return R.map(k => ({optionKey: k, name: obj[k].name}), R.keys(filtered))
}

const printArray = ary => {
  return R.dropLast(2, R.reduce((a, b) => `${a} ${b.name} +`, '', ary))
}


function OptionCard(props) {
  return (
    <li className={`option-card ${props.isSelected ? '-active' : ''}`} onClick={props.handleToggle}>
      {props.dishName}
    </li>
  )
}

function C07Panel(props) {
  const [activeTab, setActiveTab] = useState(0);
  const [optionDishes, setOptionDishes] = useState({});
  const [methodDishes, setMethodDishes] = useState({});

  useEffect(() => {
    console.log(props.C07OptionsDishes)
    setOptionDishes(R.map((d) => ({...d, isSelected: false}), props.C07OptionsDishes))
  }, [props.C07OptionsDishes])

  useEffect(() => {
    console.log(props.C07MethodsDishes)
    setMethodDishes(R.map((d) => ({...d, isSelected: false}), props.C07MethodsDishes))
  }, [props.C07MethodsDishes])

  const toggleOption = key => {
    const cleared = R.map(d => ({...d, isSelected: false}), optionDishes)
    const option = optionDishes[key]
    setOptionDishes({...cleared, [key]: {...option, isSelected: !option.isSelected}})
  }

  const toggleMethod = key => {
    const cleared = R.map(d => ({...d, isSelected: false}), methodDishes)
    const method = methodDishes[key]
    setMethodDishes({...cleared, [key]: {...method, isSelected: !method.isSelected}})
  }

  const makeMethodOptionArray = (methodDishes, optionDishes) => {
    const filteredMethod = filterSelectedOptions(methodDishes)
    const filteredOption = filterSelectedOptions(optionDishes)
    const methods = R.map(k => ({optionKey: k, name: methodDishes[k].name}), R.keys(filteredMethod))
    const options = R.map(k => ({optionKey: k, name: optionDishes[k].name}), R.keys(filteredOption))
    return R.flatten(R.append(options, methods))
  }

  const printMethodOptionArray = ary => {
    return R.reduce((a, b) => `${a}${b.name}`, '', ary)
  }


  const {
    categoryID,
    categoryDishes,
    closeDrawer,
    addDish,
    addDishWithCustomName,
  } = props;

  return (
    <div className="-C01-panel">
      <div className="panel-tabs">
        <div className={`panel-tab ${activeTab === 0 ? '-active' : ''}`} onClick={() => setActiveTab(0)}>自由搭配</div>
        <div className={`panel-tab ${activeTab === 1 ? '-active' : ''}`} onClick={() => setActiveTab(1)}>常用</div>
      </div>
      <div className="panel-workspace">
        {
          activeTab === 1 ?
          <div className="combined">
            <div className="dishes">
            { 
              !R.isNil(categoryDishes) &&
              Object.keys(categoryDishes).map((dishKey, i) => {
                const dish = categoryDishes[dishKey];
                return (
                  <Card 
                    dishName={dish.name} 
                    categoryID={categoryID}
                    dishID={dishKey}
                    type="ADD"
                    cb={(a, b) => {
                      addDish(a, b);
                      closeDrawer();
                    }}
                    key={dishKey}
                  />
                )
              })
            }
            </div>
          </div>
          :
          <div className="free">
            1. 選擇料理方式：
            <ul className="options">
            { 
              !R.isNil(methodDishes) &&
              Object.keys(methodDishes).sort().map((dishKey, i) => {
                const dish = methodDishes[dishKey];
                return (
                  <OptionCard 
                    dishName={dish.name} 
                    categoryID={categoryID}
                    dishID={dishKey}
                    key={dishKey}
                    isSelected={dish.isSelected}
                    handleToggle={() => toggleMethod(dishKey)}
                  />
                )
              })
            }
            </ul>
            <hr/>
            2. 選擇要使用的魚
            <ul className="options">
            { 
              !R.isNil(optionDishes) &&
              Object.keys(optionDishes).sort().map((dishKey, i) => {
                const dish = optionDishes[dishKey];
                return (
                  <OptionCard 
                    dishName={dish.name} 
                    categoryID={categoryID}
                    dishID={dishKey}
                    key={dishKey}
                    isSelected={dish.isSelected}
                    handleToggle={() => toggleOption(dishKey)}
                  />
                )
              })
            }
            </ul>
            <hr/>
            {
              makeMethodOptionArray(methodDishes, optionDishes) &&
              makeMethodOptionArray(methodDishes, optionDishes).length > 0 &&
              <div className="">
                <div style={{marginBottom: '12px'}}>3. 完成組合後點選右方加入：</div>
                
                <Card 
                  type="ADD"
                  dishName={printMethodOptionArray(makeMethodOptionArray(methodDishes, optionDishes))}
                  categoryID="-C07"
                  dishID="-C07-CUSTOM-OPTIONS-DISH"
                  mergedOptionsArray={makeMethodOptionArray(methodDishes, optionDishes)}
                  cb={(a, b) => {
                    // addDish(a, b);
                    addDishWithCustomName(a, b, printMethodOptionArray(makeMethodOptionArray(methodDishes, optionDishes)))
                    // console.log(a, b)
                    closeDrawer();
                  }}
                />
              </div>
            }
            
            

          </div>
        }
      </div>

    </div>
  )
}