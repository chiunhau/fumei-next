import Head from 'next/head'
import Header from '../components/header';
import DishTemplate from '../components/dishTemplate';
import DishDrawer from '../components/dishDrawer';
import firebase from '../firebase';

const db = firebase.database();

const R = require('ramda');

const data = [
  {
    category_name: '冷盤',
    category_id: 1,
    dishes: [{name: '龍腸+軟絲+烏魚子', id: 1}]
  },
  {
    category_name: '拼盤',
    category_id: 2,
    dishes: [{name: '大目連生併盤', id: 2}, {name: '大目連生併盤3', id: 3}]
  },
  {
    category_name: '沙拉',
    category_id: 3,
    dishes: [{name: '好吃沙拉', id: 4}]
  },
  {
    category_name: '龍蝦',
    category_id: 4,
    dishes: []
  }
]


class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      drawerIsOpen: false,
      drawerData: {},
      templateData: data
    }
  }

  openDrawer = (data) => {
    console.log('open')
    this.setState({
      drawerIsOpen: true,
      drawerData: data
    })
  }

  closeDrawer = () => {
    this.setState({
      drawerIsOpen: false
    })
  }

  updateTemplate = ({actionType, payload}) => {
    const indexOfCat = R.findIndex(R.propEq('category_id', payload.category_id))(this.state.templateData);
    const category = this.state.templateData[indexOfCat];
    console.log(indexOfCat)
    switch (actionType) {
      case 'ADD':
        var newDishes = R.append(payload.dish, category.dishes);
        console.log(newDishes)
        this.setState({
          templateData: R.update(indexOfCat, {...category, dishes: newDishes}, this.state.templateData)
        })
        break;
      
      case 'REMOVE':
        var indexOfDish = R.findIndex(R.propEq('id', payload.dish.id))(category.dishes)
        var newDishes = R.remove(indexOfDish, 1, category.dishes);
        console.log(newDishes)
        this.setState({
          templateData: R.update(indexOfCat, {...category, dishes: newDishes}, this.state.templateData)
        })
        break;
    
      default:
        break;
    }
  }

  onSubmit = () => {
    console.log(this.state.templateData)
  }

  componentDidMount() {
    db.ref('/categories').once('value').then(snapshot => console.log(snapshot.val()))
    db.ref('/templates/0').once('value').then(snapshot => console.log(snapshot.val()))
  }
  render() {
    return (
      <div className="page-index">
        <Header 
          onSubmit={this.onSubmit}
        />
        <div className="container">
          <DishTemplate 
            data={this.state.templateData}
            openDrawer={this.openDrawer}
            updateTemplate={this.updateTemplate}
          />
        </div>
        <DishDrawer 
          drawerIsOpen={this.state.drawerIsOpen}
          closeDrawer={this.closeDrawer}
          data={this.state.drawerData}
          updateTemplate={this.updateTemplate}
        />
      </div>
    )
  }
}
export default Index
