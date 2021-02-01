import './App.css';
import Overlay from "./overlay/Overlay"
import LinkGenerator from './link-generator/LinkGenerator';
import { loadParams } from "./actions";
import { connect } from 'react-redux';

function App({loadParams}) {
  const params = (new URL(document.location)).searchParams;

  const accessToken = params.get("token");
  const campaignId = params.get("campaign");
  const testMode = params.get("test");

  loadParams({accessToken, campaignId, testMode: !!testMode});

  return accessToken && campaignId ? 
  <Overlay/> : <LinkGenerator/>;
}

const mapDispatchToProps = {loadParams};
export default connect(null, mapDispatchToProps)(App);
