import React from 'react';
import Link from 'next/link'
import { Menu, X, Edit3, BookOpen, Users, Plus, Database } from 'react-feather';

const menuItems = [
  { name: '所有菜單', path: '/', icon: BookOpen },
  { name: '建立菜單', path: '/create', icon: Edit3 },
  { name: '菜色資料庫', path: '/manage', icon: Database},
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
    const  {title = '所有菜單', onSubmit, showRightIcon = true} = this.props;
    return (
      <div className="app-header">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-2 text-left clickable"><Menu color="var(--red)" size="1.5rem" onClick={this.openMenu}/></div>
            <div className="col-8 text-center"><h2 className="title">{title}</h2></div>
            {
              showRightIcon &&
              <div className="col-2 text-right clickable"><Link href="/create"><a><Plus color="var(--red)" size="1.5rem"/></a></Link></div>
            }
            
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
              <X color="var(--red)"　size="1.5rem" onClick={this.closeMenu} className="icon-close"/>
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