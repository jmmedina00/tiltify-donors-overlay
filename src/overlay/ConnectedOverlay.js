import React from 'react';
import Overlay from './Overlay';
import { getDonations } from '../services/tiltify';
import { connect } from 'react-redux';
import { from, interval, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const isThisDevMode = () => '_self' in React.createElement('div');

const mapStateToProps = ({ token, campaign, test, highest }) => ({
  donations$:
    test && isThisDevMode()
      ? interval(5000).pipe(
          map(count =>
            new Array(count + 1).fill(0).map((_, index) => ({
              id: index,
              name: 'Testing',
              amount: index * 0.5,
            }))
          )
        )
      : timer(2000, 60000).pipe(
          switchMap(() => from(getDonations(token, campaign))),
          map(data =>
            data.map(({ id, amount, name }) => ({ id, amount, name }))
          ),
          map(data =>
            !highest ? data : data.sort(({ amount: a }, { amount: b }) => b - a)
          )
        ),
});

export default connect(mapStateToProps)(Overlay);
