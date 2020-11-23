import React from 'react';
import Link from 'next/link'
import { Menu, X, Edit3, BookOpen, Users } from 'react-feather';

const menuItems = [
  { name: '新增菜單', path: '/create', icon: Edit3 },
  { name: '管理菜單', path: '/manage', icon: BookOpen },
  // { name: '檢視分類', path: '/categories', icon: BookOpen},
  // { name: '帳號管理', path: '/account', icon: Users}
]

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      menuIsOpen: false
    }
  }

  openMenu = () => {
    this.setState({
      menuIsOpen: true
    })
  }

  closeMenu = () => {
    this.setState({
      menuIsOpen: false
    })
  }

  render() {
    const  {title = '富美配菜', onSubmit} = this.props;
    return (
      <div className="app-header">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-4 text-left"><Menu color="var(--red)" onClick={this.openMenu}/></div>
            <div className="col-4 text-center"><h2 className="title">{title}</h2></div>
            {/* <div className="col-4 text-right"><button type="button" className="btn btn-link px-0" onClick={onSubmit}>下一步</button></div> */}
          </div>
        </div>
        <div className={`sidebar ${this.state.menuIsOpen ? '-active' : ''}`}>
          {
            this.state.menuIsOpen &&
            <div className="overlay" onClick={this.closeMenu}></div>
          }
          
          <div className="element container">
            <div className="header  d-flex align-items-center justify-content-between">
              <h1 className="title">富美海鮮配菜系統</h1>
              <X color="var(--red)" onClick={this.closeMenu} className="close"/>
            </div>
            <ul className="menu">
              {
                menuItems.map((item, i) => (
                  <li className="item" key={item.name}>
                    <Link href={item.path}>
                      <a onClick={this.closeMenu}><item.icon color="var(--red)"/> {item.name}</a>
                    </Link>
                  </li>
                ))
              }
            </ul>
            
          </div>
        </div>
      </div>
    )
  }
}

export default Header