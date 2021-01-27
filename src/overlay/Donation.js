import AmountDisplay from "./AmountDisplay";

const Donation = ({amount, name}) => 
  <div className="donation">
    <div className="donor">{name}</div>
    <AmountDisplay>{amount.toFixed(2)}</AmountDisplay> 
  </div>;

export default Donation;