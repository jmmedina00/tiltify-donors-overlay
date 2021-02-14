import './App.css';
import Overlay from "./overlay/ConnectedOverlay"
import LinkGenerator from './link-generator/LinkGenerator';
import { loadParams } from "./store/actions";
import { connect } from 'react-redux';

function App({loadParams}) {
  const params = (new URL(document.location)).searchParams;

  const objectParams = [...params.entries()]
    .reduce((object, [key, value]) => {
    object[key] = value;
    return object;
  }, {})

  loadParams(objectParams);

  const accessToken = params.get("token");
  const campaignId = params.get("campaign");

  return accessToken && campaignId ? 
  <Overlay/> : <LinkGenerator/>;
}

const mapDispatchToProps = {loadParams};
export default connect(null, mapDispatchToProps)(App);
