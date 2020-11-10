import { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchData } from '../actions/fetchActions';
import * as R from 'ramda';


function Categories(props) {
  useEffect(() => {
    props.fetchCategories();
  })

  return (
    <div>
      <ul>
      {
        props.categories &&
        R.map((category, i) => (
          <li>
            {category}
          </li>
        ), props.categories)
      }
      </ul>
    </div>
  )
}

const mapStateToProps = state => ({
  categories: state.data['/categories']
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: config => {
    dispatch(fetchData({
      path: '/categories',
      id: '/categories'
    }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)