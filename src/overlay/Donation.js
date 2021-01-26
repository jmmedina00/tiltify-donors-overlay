import "./Donation.css";

const Donation = ({amount, name}) => 
  <div className="donation">
    <span className="donor">{name}</span>
    <span className="amount">{amount}</span>
  </div>;

export default Donation;