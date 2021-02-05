import { connect } from "react-redux";
import { ajax } from "rxjs/ajax";
import { interval, timer } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
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

const mapStateToProps = ({token, campaign, test}) => ({
  donations$: test ? 
  interval(5000).pipe(
    map(count => new Array(count + 1).fill(0).map((_, index) => ({id: index, name: "Testing", amount: index * 0.5}))),
    tap(data => console.log(data)),
  ) : 
  timer(2000, 60000).pipe(
    switchMap(() => ajax({
      url: `https://tiltify.com/api/v3/campaigns/${campaign}/donations?count=100`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })),
    map(({response: { data }}) => data.map(({id, amount, name}) => ({id, amount, name}))),
    tap(data => console.log(data))
  )
});

export default connect(mapStateToProps)(Overlay);