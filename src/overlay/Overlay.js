import { useEffect, useState } from "react";
import Donation from "./Donation";

const Overlay = ({donations$}) => {
  const [state, setState] = useState({donations: []});

  useEffect(() => {
    const subscription = donations$.subscribe(
      donations => setState({donations}),
      err => setState({error: true})
    );

    return () => {subscription.unsubscribe();};
  }, [donations$]) // Don't resubscribe unless the donations$ observable itself changes
 
  if (state.error) {
    return <p>Token has been banned.</p>
  }
  
  const visualDonations = state.donations.map(
    ({id, amount, name}) => <Donation key={id} amount={amount} name={name}/>
  )
  return <div>{visualDonations}</div>;
}

export default Overlay;