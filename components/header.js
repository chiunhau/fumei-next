import React from 'react';
import { Menu, X, Edit3, BookOpen, Users } from 'react-feather';

const menuItems = [
  { name: '新增菜單', icon: Edit3 },
  { name: '管理菜單', icon: BookOpen },
  { name: '帳號管理', icon: Users}
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
    const  {title = '菜單規劃', actionCb} = this.props;
    return (
      <div className="app-header">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-4 text-left"><Menu color="var(--red)" onClick={this.openMenu}/></div>
            <div className="col-4 text-center"><h2 className="title">{title}</h2></div>
            <div className="col-4 text-right"><button type="button" className="btn btn-link px-0" onClick={actionCb}>下一步</button></div>
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
                  <li className="item">
                    <item.icon color="var(--red)"/> {item.name}
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