import Overlay from "./Overlay";
import { connect } from "react-redux";
import { from, interval, timer } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";

const mapStateToProps = ({token, campaign, test, highest}) => ({
  donations$: test ? 
  interval(5000).pipe(
    map(count => new Array(count + 1).fill(0).map((_, index) => ({id: index, name: "Testing", amount: index * 0.5}))),
    tap(data => console.log(data)),
  ) : 
  timer(2000, 60000).pipe(
    switchMap(() => from(getDonations(token, campaign))),
    map(data => data.map(({id, amount, name}) => ({id, amount, name}))),
    map(data => !highest ? data : data.sort(({amount: a}, {amount: b}) => b - a)),
    tap(data => console.log(data))
  )
});

const getDonations = async (token, campaign) => {
  const url = "https://tiltify.com";
  const firstPath = `/api/v3/campaigns/${campaign}/donations?count=100`;
  const headers = new Headers({Authorization: `Bearer ${token}`});
  
  let currentPrev;
  const donations = [];
  do {
    const response = await fetch(url + (currentPrev || firstPath), {headers});

    if (!response.ok) {
      throw new Error("Token has been banned")
    }

    const {data, links: {prev}} = await response.json();
    donations.push(...data);
    currentPrev = prev;
  } while (currentPrev);

  return donations;
}

export default connect(mapStateToProps)(Overlay);