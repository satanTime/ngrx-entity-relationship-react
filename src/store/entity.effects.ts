import {reduceFlat, reduceGraph} from 'ngrx-entity-relationship';
import {Store} from 'redux';

import {RootState, rootAddress, rootCompany, rootUser} from './reducers';

export class EntityEffects {
  constructor(protected readonly store: Store<RootState>) {}

  public address(): void {
    this.store.dispatch(
      reduceGraph({
        data: [
          {
            id: '1',
            street: 'Main st.',
            city: 'Town',
            country: 'Land',
          },
        ],
        selector: rootAddress(),
      }),
    );
  }

  public company(): void {
    this.store.dispatch(
      reduceGraph({
        data: [
          {
            id: '1',
            name: 'Magic',
            adminId: '2',
            addressId: '1',
          },
        ],
        selector: rootCompany(),
      }),
    );
  }

  public user(): void {
    this.store.dispatch(
      reduceFlat({
        data: {
          users: [
            {
              id: '1',
              firstName: 'John',
              lastName: 'Smith',
              companyId: '1',
            },
            {
              id: '2',
              firstName: 'Jack',
              lastName: 'Black',
              companyId: '1',
            },
          ],
        },
        selector: rootUser({
          flatKey: 'users',
        }),
      }),
    );
  }
}
