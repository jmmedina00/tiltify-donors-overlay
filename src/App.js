import './App.css';
import Overlay from "./overlay/Overlay"
import LinkGenerator from './link-generator/LinkGenerator';

function App() {
  const params = (new URL(document.location)).searchParams;

  const accessToken = params.get("token");
  const campaignId = params.get("campaign");

  return accessToken && campaignId ? 
  <Overlay token={accessToken} campaignId={campaignId}/> : 
  <LinkGenerator/>;
}

export default App;
