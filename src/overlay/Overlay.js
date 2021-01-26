import { ajax } from "rxjs/ajax";
import { interval } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import React from "react";

class Overlay extends React.Component {
  subscription = null;
  
  donations$ = interval(5000).pipe(
    switchMap(() => ajax({
      url: `https://tiltify.com/api/v3/campaigns/${this.props.campaignId}/donations?count=100`,
      method: "GET",
      headers: {Authorization: `Bearer ${this.props.token}`}
    })),
    map(({response: { data }}) => data.map(({amount, name}) => ({amount, name}))),
    tap(data => console.log(data))
  );

  updateDonations(donations) {
    this.setState({donations});
  }

  componentDidMount() {
    this.subscription = this.donations$.subscribe(this.updateDonations.bind(this));
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return <p>{this.props.token} - {this.props.campaignId}</p>;
  }
}

export default Overlay;