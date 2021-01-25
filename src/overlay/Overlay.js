import { useEffect, useState } from "react";
import { ajax } from "rxjs/ajax";
import { interval } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";

const createObservable = (token, campaignId) => interval(5000).pipe(
  switchMap(() => ajax({
    url: `https://tiltify.com/api/v3/campaigns/${campaignId}/donations?count=100`,
    method: "GET",
    headers: {Authorization: `Bearer ${token}`}
  })),
  map(({response: { data }}) => data.map(({amount, name}) => ({amount, name}))),
);

let donations$;

const Overlay = ({token, campaignId}) => {
  if (!donations$) {
    donations$ = createObservable(token, campaignId);
  }
  
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const subscription = donations$.subscribe(setDonations);
    return () => subscription.unsubscribe();
  }, [])

  return <p>{token} - {campaignId}</p>;
}

export default Overlay;