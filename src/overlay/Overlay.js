import { ajax } from "rxjs/ajax";
import { interval, timer } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import React from "react";
import Donation from "./Donation";

class Overlay extends React.Component {
  subscription = null;

  state = {donations: []};
  
  donations$ = this.props.test ? 
  interval(5000).pipe(
    map(count => new Array(count + 1).fill(0).map((_, index) => ({id: index, name: "Testing", amount: index * 0.5}))),
    tap(data => console.log(data))
  ) : 
  timer(2000, 60000).pipe(
    switchMap(() => ajax({
      url: `https://tiltify.com/api/v3/campaigns/${this.props.campaignId}/donations?count=100`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.props.token}`,
        "User-Agent": "jmmedina00/donors-overlay"
      }
    })),
    map(({response: { data }}) => data.map(({id, amount, name}) => ({id, amount, name}))),
    tap(data => console.log(data))
  );

  updateDonations(donations) {
    this.setState({donations});
  }

  componentDidMount() {
    this.subscription = this.donations$.subscribe(
      res => this.updateDonations(res),
      err => this.setState({error: true})
    );
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    if (this.state.error) {
      return <p>Token has been banned.</p>
    }
    
    const visualDonations = this.state.donations.map(
      ({id, amount, name}) => <Donation key={id} amount={amount} name={name}/>
    )
    return <div>{visualDonations}</div>;
  }
}

const mapStateToProps = ({token, campaignId, testMode}) => ({token, campaignId, testMode});
export default connect(mapStateToProps)(Overlay);