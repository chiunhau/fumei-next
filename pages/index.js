import Head from 'next/head'
import Header from '../components/header';
import DishTemplate from '../components/dishTemplate';
import DishDrawer from '../components/dishDrawer';
import firebase from '../firebase';
import {connect} from 'react-redux';
import { fetchData } from '../actions/fetchActions';

const db = firebase.database();

const R = require('ramda');




class Index extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div className="page-index">
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(Index);
