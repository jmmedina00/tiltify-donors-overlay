import "./Donation.css";

const Donation = ({amount, name}) => 
  <div className="donation">
    <div className="donor">{name}</div>
    <div className="amount">{amount.toFixed(2)}</div>
  </div>;

export default Donation;