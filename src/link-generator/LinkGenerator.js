const generateLink = event => {
  event.preventDefault();
  const queryParams = [...new FormData(event.target).entries()]
    .map(entry => entry.map(encodeURIComponent).join("="))
    .join("&");

  const targetUrl = `${new URL(document.location).host}?${queryParams}`;

  navigator.clipboard.writeText(targetUrl)
  .then(() => {alert("URL has been copied to your clipboard");})
  .catch(error => {alert("An error has ocurred"); console.log(error);});
}

const LinkGenerator = () => 
<div className="vertical-center">
  <div className="horizontal-center">
    <form onSubmit={generateLink}>
      <div className="generator">
        <div>
          <label htmlFor="campaign">Campaign id</label>
          <input type="text" id="campaign" name="campaign"></input>
        </div>
        <div>
          <label htmlFor="token">Access token</label>
          <input type="text" id="token" name="token"></input>
        </div>
        <div>
          <span className="title">Currency</span>
          <input type="radio" id="dollar" name="currency" value="dollar"/>
          <label htmlFor="dollar">$</label>
          <input type="radio" id="euro" name="currency" value="euro"/>
          <label htmlFor="euro">€</label>
        </div>
        <div>
          <label htmlFor="swap">Currency to the left?</label>
          <input type="checkbox" id="swap" name="swap" defaultChecked="true"/>
        </div>
      </div>
      <button className="generate-link">Link</button>
    </form>
  </div>
</div>

export default LinkGenerator;