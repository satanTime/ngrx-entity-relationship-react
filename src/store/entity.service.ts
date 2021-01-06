import {Store} from 'redux';

import {updateAddress} from './address/address.actions';
import {updateCompany} from './company/company.actions';
import {RootState, rootAddress, rootCompany, rootUser} from './reducers';
import {updateUser} from './user/user.actions';

export class EntityService {
  constructor(protected readonly store: Store<RootState>) {}

  public changeUser(id: string): void {
    const entity = rootUser()(this.store.getState(), id);
    if (!entity) {
      return;
    }

    const index = entity.lastName.match(/\d+$/)?.[0] || '0';
    this.store.dispatch(
      updateUser({
        user: {
          id,
          changes: {
            lastName: `Changed User ${parseInt(index[0], 10) + 1}`,
          },
        },
      }),
    );
  }

  public changeCompany(id: string): void {
    const entity = rootCompany()(this.store.getState(), id);
    if (!entity) {
      return;
    }

    const index = entity.name.match(/\d+$/)?.[0] || '0';
    this.store.dispatch(
      updateCompany({
        company: {
          id,
          changes: {
            name: `Changed Company ${parseInt(index[0], 10) + 1}`,
          },
        },
      }),
    );
  }

  public changeAddress(id: string): void {
    const entity = rootAddress()(this.store.getState(), id);
    if (!entity) {
      return;
    }

    const index = entity.street.match(/\d+$/)?.[0] || '0';
    this.store.dispatch(
      updateAddress({
        address: {
          id,
          changes: {
            street: `Changed Address ${parseInt(index[0], 10) + 1}`,
          },
        },
      }),
    );
  }
}
