import {X, Plus, ChevronLeft } from 'react-feather';
import Card from './card';
import * as R from 'ramda';
import {useEffect, useState} from 'react';
import { Form, Field } from 'react-final-form'

function Drawer(props) {
  const {
    categoryID,
    categoryName,
    categoryDishes,
    closeDrawer,
    addDish,
    addDishWithCustomName,
    C01OptionsDishes,
    C01SizesDishes,
    C02MainDishes,
    C02OptionsDishes,
    C07OptionsDishes,
    C07MethodsDishes,
    C10OptionsDishes,

  } = props;

  return (
    <div className="choices-drawer">
      <div className="click" onClick={closeDrawer}></div>
      <div className="drawer-container">
        <div className="header">
          <div className="clickable d-flex align-items-center">
            <ChevronLeft onClick={closeDrawer}/>
            <span onClick={closeDrawer}>選擇{categoryName} </span> 
          </div>
        </div>
        {
          categoryID === '-C01' ?
          <C01Panel 
            categoryID={categoryID}
            categoryDishes={categoryDishes}
            closeDrawer={closeDrawer}
            addDish={addDish}
            replaceDish={props.replaceDish}
            addDishWithCustomName={addDishWithCustomName}
            replaceDishWithCustomName={props.replaceDishWithCustomName}
            C01OptionsDishes={C01OptionsDishes}
            C01SizesDishes={C01SizesDishes}
            replaceIndex={props.replaceIndex}
          />
          : categoryID === '-C02' ?
          <C02Panel 
            categoryID={categoryID}
            categoryDishes={categoryDishes}
            closeDrawer={closeDrawer}
            addDish={addDish}
            addDishWithCustomName={addDishWithCustomName}
            replaceDish={props.replaceDish}
            replaceDishWithCustomName={props.replaceDishWithCustomName}
            C02MainDishes={C02MainDishes}
            C02OptionsDishes={C02OptionsDishes}
            replaceIndex={props.replaceIndex}
          />
          : categoryID === '-C07' ?
          <C07Panel 
            categoryID={categoryID}
            categoryDishes={categoryDishes}
            closeDrawer={closeDrawer}
            addDish={addDish}
            addDishWithCustomName={addDishWithCustomName}
            replaceDish={props.replaceDish}
            replaceDishWithCustomName={props.replaceDishWithCustomName}
            C07OptionsDishes={C07OptionsDishes}
            C07MethodsDishes={C07MethodsDishes}
            replaceIndex={props.replaceIndex}
          />
          : categoryID === '-C10' ?
          <C10Panel 
            categoryID={categoryID}
            categoryDishes={categoryDishes}
            closeDrawer={closeDrawer}
            addDish={addDish}
            addDishWithCustomName={addDishWithCustomName}
            replaceDish={props.replaceDish}
            replaceDishWithCustomName={props.replaceDishWithCustomName}
            C10OptionsDishes={C10OptionsDishes}
            replaceIndex={props.replaceIndex}
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
                      if (props.replaceIndex >= 0) {
                        console.log(props.replaceIndex)
                        props.replaceDish(categoryID, dishKey, props.replaceIndex)//
                        
                      }
                      else {
                        addDish(a, b);
                      }
                      
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
  const [sizeDishes, setSizeDishes] = useState({});

  useEffect(() => {
    setOptionDishes(R.map((d) => ({...d, isSelected: false}), props.C01OptionsDishes))
  }, [props.C01OptionsDishes])

  useEffect(() => {
    setSizeDishes(R.map((d) => ({...d, isSelected: false}), props.C01SizesDishes))
  }, [props.C01SizesDishes])

  const toggleOption = key => {
    const option = optionDishes[key]
    setOptionDishes({...optionDishes, [key]: {...option, isSelected: !option.isSelected}})
  }

  const toggleSize = key => {
    const size = sizeDishes[key];
    const cleared = R.map(d => ({...d, isSelected: false}), sizeDishes)
    setSizeDishes({...cleared, [key]: {...size, isSelected: !size.isSelected}})
  }


  const {
    categoryID,
    categoryDishes,
    closeDrawer,
    addDish,
    addDishWithCustomName,
    C01OptionsDishes
  } = props;


  const addSizeToName = (str) => {
    const filteredMethod = filterSelectedOptions(sizeDishes)
    const sizes = R.map(k => ({optionKey: k, name: sizeDishes[k].name}), R.keys(filteredMethod))
    if (sizes[0]) {
      return `${str}（${sizes[0].name}）`
    }
    else {
      return `${str}`
    }
    
  }
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
                      if (props.replaceIndex >= 0) {
                        console.log(props.replaceIndex)
                        props.replaceDish(categoryID, dishKey, props.replaceIndex)//
                        
                      }
                      else {
                        addDish(a, b);
                      }
                      
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
            2. 選擇大小：
            <ul className="options">
            { 
              !R.isNil(sizeDishes) &&
              Object.keys(sizeDishes).sort().map((dishKey, i) => {
                const dish = sizeDishes[dishKey];
                return (
                  <OptionCard 
                    dishName={dish.name} 
                    categoryID={categoryID}
                    dishID={dishKey}
                    key={dishKey}
                    isSelected={dish.isSelected}
                    handleToggle={() => toggleSize(dishKey)}
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
                <div style={{marginBottom: '12px'}}>3. 完成組合後點選右方加入：</div>
                
                <Card 
                  type="ADD"
                  dishName={addSizeToName(printArray(makeNamesArray(optionDishes)))}
                  categoryID="-C01"
                  dishID="-C01-CUSTOM-OPTIONS-DISH"
                  mergedOptionsArray={makeNamesArray(optionDishes)}
                  cb={(a, b) => {
                    if (props.replaceIndex >= 0) {
                      console.log(props.replaceIndex)
                      props.replaceDishWithCustomName(categoryID, '-C01-CUSTOM-OPTIONS-DISH', addSizeToName(printArray(makeNamesArray(optionDishes))), props.replaceIndex)//
                      
                    }
                    else {
                      addDishWithCustomName(a, b, addSizeToName(printArray(makeNamesArray(optionDishes))))
                    }
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
function C02Panel(props) {
  const [activeTab, setActiveTab] = useState(0);
  const [mainDishes, setMainDishes] = useState({});
  const [optionDishes, setOptionDishes] = useState({});

  useEffect(() => {
    setMainDishes(R.map((d) => ({...d, isSelected: false}), props.C02MainDishes))
  }, [props.C02MainDishes])

  useEffect(() => {
    setOptionDishes(R.map((d) => ({...d, isSelected: false}), props.C02OptionsDishes))
  }, [props.C02OptionsDishes])

  const toggleMain = key => {
    const main = mainDishes[key];
    const cleared = R.map(d => ({...d, isSelected: false}), mainDishes)
    setMainDishes({...cleared, [key]: {...main, isSelected: !main.isSelected}})
  }

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


  const addMainToName = (str) => {
    const filteredMain = filterSelectedOptions(mainDishes)
    const main = R.map(k => ({optionKey: k, name: mainDishes[k].name}), R.keys(filteredMain))
    if (main[0]) {
      return `${main[0].name}（${str}）`
    }
    else {
      return `${str}`
    }
  }
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
                      if (props.replaceIndex >= 0) {
                        console.log(props.replaceIndex)
                        props.replaceDish(categoryID, dishKey, props.replaceIndex)//
                        
                      }
                      else {
                        addDish(a, b);
                      }
                      
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
            1. 選擇一道主材料：
            <ul className="options">
            { 
              !R.isNil(mainDishes) &&
              Object.keys(mainDishes).sort().map((dishKey, i) => {
                const dish = mainDishes[dishKey];
                return (
                  <OptionCard 
                    dishName={dish.name} 
                    categoryID={categoryID}
                    dishID={dishKey}
                    key={dishKey}
                    isSelected={dish.isSelected}
                    handleToggle={() => toggleMain(dishKey)}
                  />
                )
              })
            }
            </ul>
            <hr/>
            2. 選擇多個配料：
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
              makeNamesArray(mainDishes) &&
              makeNamesArray(optionDishes) &&
              <div className="">
                <div style={{marginBottom: '12px'}}>3. 完成組合後點選右方加入：</div>
                
                <Card 
                  type="ADD"
                  dishName={addMainToName(printArray(makeNamesArray(optionDishes)))}
                  categoryID="-C02"
                  dishID="-C02-CUSTOM-OPTIONS-DISH"
                  mergedOptionsArray={makeNamesArray(optionDishes)}
                  cb={(a, b) => {
                    if (props.replaceIndex >= 0) {
                      console.log(props.replaceIndex)
                      props.replaceDishWithCustomName(categoryID, '-C02-CUSTOM-OPTIONS-DISH', addMainToName(printArray(makeNamesArray(optionDishes))), props.replaceIndex)//
                      
                    }
                    else {
                      addDishWithCustomName(a, b, addMainToName(printArray(makeNamesArray(optionDishes))))
                    }
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
  const [customName, setCustomName] = useState('');

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
        <div className={`panel-tab ${activeTab === 2 ? '-active' : ''}`} onClick={() => setActiveTab(2)}>手動輸入</div>
      </div>
      <div className="panel-workspace">
        {
          activeTab === 1 &&
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
                      if (props.replaceIndex >= 0) {
                        console.log(props.replaceIndex)
                        props.replaceDish(categoryID, dishKey, props.replaceIndex)//
                        
                      }
                      else {
                        addDish(a, b);
                      }
                      
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


          {
          activeTab === 0 &&
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
                    if (props.replaceIndex >= 0) {
                      console.log(props.replaceIndex)
                      props.replaceDishWithCustomName(categoryID, '-C07-CUSTOM-OPTIONS-DISH', printMethodOptionArray(makeMethodOptionArray(methodDishes, optionDishes)), props.replaceIndex)
                      
                    }
                    else {
                      addDishWithCustomName(a, b, printMethodOptionArray(makeMethodOptionArray(methodDishes, optionDishes)))
                    }


                    // addDish(a, b);
                    // addDishWithCustomName(a, b, printMethodOptionArray(makeMethodOptionArray(methodDishes, optionDishes)))
                    // console.log(a, b)
                    closeDrawer();
                  }}
                />
              </div>
            }
          </div>
        }
        {
          activeTab === 2 &&
          <div className="">
              <div className="">
                1. 手動輸入菜色名稱：
                <form action="">
                <div className="form-group">
                    <input type="text" className="form-control" id="exampleInputEmail1" value={customName} onChange={e => setCustomName(e.target.value)}/>
                  </div>
                </form>
              </div>
                <div style={{marginBottom: '12px'}}>2. 完成組合後點選右方加入：</div>
                
                <Card 
                  type="ADD"
                  dishName={customName}
                  categoryID="-C07"
                  dishID="-C07-CUSTOM-DISH"
                  cb={(a, b) => {
                    if (props.replaceIndex >= 0) {
                      console.log(props.replaceIndex)
                      props.replaceDishWithCustomName(categoryID, '-C07-CUSTOM-DISH', customName, props.replaceIndex)
                      
                    }
                    else {
                      addDishWithCustomName(categoryID, '-C07-CUSTOM-DISH', customName)
                    }
                    closeDrawer();
                  }}
                />
              </div>
        }
      </div>

    </div>
  )
}

function C10Panel(props) {
  const [activeTab, setActiveTab] = useState(0);
  const [optionDishes, setOptionDishes] = useState({});

  useEffect(() => {
    setOptionDishes(R.map((d) => ({...d, isSelected: false}), props.C10OptionsDishes))
  }, [props.C10OptionsDishes])


  const toggleOption = key => {
    
    const option = optionDishes[key];
    if (makeNamesArray({...optionDishes, [key]: {...option, isSelected: !option.isSelected}}).length <= 2) {
      setOptionDishes({...optionDishes, [key]: {...option, isSelected: !option.isSelected}})
    }
    
    
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
                      if (props.replaceIndex >= 0) {
                        console.log(props.replaceIndex)
                        props.replaceDish(categoryID, dishKey, props.replaceIndex)//
                        
                      }
                      else {
                        addDish(a, b);
                      }
                      
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
            1. 任選兩道食材：
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
                  categoryID="-C10"
                  dishID="-C10-CUSTOM-OPTIONS-DISH"
                  mergedOptionsArray={makeNamesArray(optionDishes)}
                  cb={(a, b) => {
                    if (props.replaceIndex >= 0) {
                      console.log(props.replaceIndex)
                      props.replaceDishWithCustomName(categoryID, '-C10-CUSTOM-OPTIONS-DISH', printArray(makeNamesArray(optionDishes)), props.replaceIndex)//
                      
                    }
                    else {
                      addDishWithCustomName(a, b, printArray(makeNamesArray(optionDishes)))
                    }
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