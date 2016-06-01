import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
//import SvgIcons from './svgIcons';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';
import Radium from 'radium';

const propTypes = {
  compStyle : React.PropTypes.object,
  settings: React.PropTypes.object.isRequired
};

class Input extends VertoBaseComponent {

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      fieldset: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        paddingBottom: '15px'
      },
      label: {
        paddingBottom: '15px',
        fontWeight: '700',
        fontSize: '14px'
      },
      inputArea: {
        paddingBottom: '3px',
        border: '0px',
        borderBottom: '1px solid #d2d2d2',
        color: "rgba(0,0,0,84)",
        fontSize: '14px',
        fontWeight: '300',
        width: '100%'
      }
    };

    return (styles[styleName]);
  }


  render(){
    return (
      <div style={{...this.getStyle('fieldset')}}>
        <div style={{...this.getStyle('label')}}>{this.props.label}</div>
        <div ><input placeholder={this.props.placeholder} style={{...this.getStyle('inputArea')}} onChange={
          (e) =>{
            this.props.cbChanging(this.props.label.replace(' ', '').toLowerCase(), e.target.value );
          }
        } defaultValue={this.props.value}/></div>
      </div>);
  }
}


class Login extends VertoBaseComponent{

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        display: 'flex',
        padding: '30px',
        backgroundColor: '#fff',
        color: "rgba(0,0,0,84)",
        flexDirection: "column",
        boxShadow: "0px 8px 17px 0px rgba(0,0,0,.2), 0px 6px 20px 0px rgba(0,0,0,.19)",
        width: "30vw"
      },
      header: {
        fontSize: '24px',
        fontWeight: '300',
        marginTop: '0px',
        marginBottom: '20px'
      },
      settingsLoginCont: {
        display: 'flex',
        marginTop: '10px',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      settingsLink: {
        color: '#009688',
        fontWeight: '300',
        cursor: 'pointer',
        size: '12px',
        ':hover': {
          textDecoration: 'underline'
        }
      },
      loginButton: {
        backgroundColor: '#5cb85c',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '400',
        padding: '8px 30px',
        border: '0px',
        margin: '10px 1px',
        cursor: 'pointer',
        borderRadius: '2px',
        textTransform: 'uppercase',
        textDecoration: 'none'
      }
    };

    return (styles[styleName]);
  }

  constructor(props) {
    super(props);
    this.state = {advanced: false, settings: this.props.settings };
    //console.log('&&&', this.props.settings)
  }

  changingInput(field, value){
    //console.log('xxxx', field, value);
    let xData = { ...this.state.settings };
    xData[field] = value;
    this.setState({ ...this.state, settings: xData });
    //console.log('....', this.state );
  }

  submitLogin() {
    //TODO validate data before sending
    //console.log('submitting login with this data: ', this.state.settings);
    this.props.cbClick(this.state.settings);
  }
  //TODO intl
  render() {
    const { formatMessage } = this.props.intl;

    let moreSettings;
    if (this.state.advanced) {
      moreSettings = (
        <span>
          <Input
              label={formatMessage({"id":"USER", "defaultMessage":"User"})}
              placeholder= {formatMessage({"id":"USER", "defaultMessage":"User"})+" i.e. 1008"}
              cbChanging={this.changingInput.bind(this)}
              value={this.state.settings.user}
          />
          <Input
              label={formatMessage({"id":"PASSWORD", "defaultMessage":"Password"})}
              placeholder={formatMessage({"id":"YOUR_PASSWORD", "defaultMessage":"Your Password"})+" i.e. 1234"}
              cbChanging={this.changingInput.bind(this)}
              value={this.state.settings.password}
          />
          <Input
              label={formatMessage({"id":"CALLER_ID", "defaultMessage":"Caller Id"})}
              placeholder={formatMessage({"id":"CALLER_ID", "defaultMessage":"Caller Id"})}
              cbChanging={this.changingInput.bind(this)}
              value={this.state.settings.callerid}
          />
          <Input
              label={formatMessage({"id":"HOSTNAME", "defaultMessage":"Hostname"})}
              placeholder={formatMessage({"id":"HOSTNAME", "defaultMessage":"Hostname"})}
              cbChanging={this.changingInput.bind(this)}
              value={this.state.settings.hostname}
          />
          <Input
              label={formatMessage({"id":"WEBSOCKET_URL", "defaultMessage":"Websocket URL"})}
              placeholder={formatMessage({"id":"WEBSOCKET_URL", "defaultMessage":"Websocket URL"})}
              cbChanging={this.changingInput.bind(this)}
              value={this.state.settings.websocketurl}/>
        </span>
      );
    }

    return (
      <div style={{...this.getStyle('container')}}>
        <div style={{...this.getStyle('header')}}><FormattedMessage id="LOGIN" defaultMessage="Login"  /></div>
        <Input
            label={formatMessage({"id":"NAME", "defaultMessage":"Name"})}
            placeholder={formatMessage({"id":"YOUR_NAME", "defaultMessage":"Your name"})}
            cbChanging={this.changingInput.bind(this)}
            value={this.state.settings.name}
        />
        <Input
            label={formatMessage({"id":"EMAIL", "defaultMessage":"Email"})}
            placeholder={formatMessage({"id":"YOUR_EMAIL", "defaultMessage":"Your email"})}
            cbChanging={this.changingInput.bind(this)}
            value={this.state.settings.email}
        />
        {moreSettings}
        <div style={{...this.getStyle('settingsLoginCont')}}>
          <span style={{...this.getStyle('settingsLink')}} onClick={()=>{
            this.setState({...this.state, advanced: !this.state.advanced });
          }}>{this.state.advanced ? <FormattedMessage id="LESS_SETTINGS" defaultMessage="Less Settings"/> :
              <FormattedMessage id="MORE_SETTINGS" defaultMessage="More Settings"/>}</span>
          <button style={{...this.getStyle('loginButton')}}onClick={this.submitLogin.bind(this)}><FormattedMessage id="LOGIN" defaultMessage="Login"/></button>
        </div>
      </div>);
  }
}

Login.propTypes = propTypes;

export default injectIntl(Radium(Login));
