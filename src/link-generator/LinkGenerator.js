const LinkGenerator = () => 
<div className="vertical-center">
  <div className="horizontal-center">
    <div className="generator">
      <div>
        <label for="campaign">Campaign id</label>
        <input type="text" id="campaign" name="campaign"></input>
      </div>
      <div>
        <label for="token">Access token</label>
        <input type="text" id="token" name="token"></input>
      </div>
      <div>
        <span className="title">Currency</span>
        <input type="radio" id="dollar" name="currency" value="dollar"/>
          <label for="dollar">$</label>
          <input type="radio" id="euro" name="currency" value="euro"/>
          <label for="euro">€</label>
      </div>
      <div>
        <label for="swap">Currency to the left?</label>
        <input type="checkbox" id="swap" name="swap" checked="true"/>
      </div>
    </div>
    <button className="generate-link">Link</button>
  </div>
</div>

export default LinkGenerator;