import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import {
AvatarSVG,
CaretUpIconSVG,
CaretDownIconSVG } from './svgIcons';

const propTypes = {
  compStyle : React.PropTypes.object
};

const defaultProps = {
  allowDisplayDetails : false
};

class UserMenu extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {'dropdownDisplayed': false};

    this.toggleMenu = this.toggleMenu.bind(this);
    UserMenu.toggleMenu = this.toggleMenu.bind(this);
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        display: 'flex',
        position: 'relative'
      },
      icon: {
        fill: this.props.allowDisplayDetails ? '#fff' : '#ccc',
        height: '24px',
        width: '24px',
        cursor: 'pointer'
      },
      caret: {
        fill: this.props.allowDisplayDetails ? '#fff' : '#ccc',
        flexGrow: 1,
        cursor: 'pointer',
        height: '16px',
        width: '20px',
        paddingBottom: '3px'
      },
      menu: {
        position: 'absolute',
        fontSize: '14px',
        right: '100px',
        minWidth: '160px',
        padding: '5px 0',
        margin: '2px 0 0',
        display: this.state.dropdownDisplayed ? 'flex' : 'none',
        flexDirection: 'column',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        boxShadow: '0 2px 5px 0 rgba(0,0,0,.25)'
      }
    };
    return (styles[styleName]);
  }


  toggleMenu() {
    if (this.props.allowDisplayDetails) {
      this.setState({...this.state, dropdownDisplayed: !this.state.dropdownDisplayed});
    }
  }

  render() {
    const menuContainer = (

      <div className="menuContainer" style={this.getStyle('menu')} >
        {this.props.children}
      </div>
    );


    return (
      <span onClick={this.toggleMenu.bind(this)}  style={this.getStyle("container")}>
        <AvatarSVG svgStyle={{...this.getStyle('icon')}}  />
          {this.state.dropdownDisplayed ?
              <CaretUpIconSVG svgStyle={{...this.getStyle('caret')}} /> :
              <CaretDownIconSVG svgStyle={{...this.getStyle('caret')}} />}
            {menuContainer}
      </span>
    );
  }
}

UserMenu.propTypes = propTypes;
UserMenu.defaultProps = defaultProps;
export default UserMenu;
