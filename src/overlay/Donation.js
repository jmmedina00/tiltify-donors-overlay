import AmountDisplay from "./AmountDisplay";
import "./Donation.css";

const Donation = ({amount, name}) => 
  <div className="donation">
    <div className="donor">{name}</div>
    <AmountDisplay>{amount.toFixed(2)}</AmountDisplay> 
  </div>;

export default Donation;