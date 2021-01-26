const Donation = ({amount, name}) => 
  <div>
    <span style={{width: "300px", display: "inline-block"}}>{name}</span>
    <span>{amount}</span>
  </div>;

export default Donation;