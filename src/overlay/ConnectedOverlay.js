import Overlay from "./Overlay";
import { getDonations } from "../services/tiltify";
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

export default connect(mapStateToProps)(Overlay);