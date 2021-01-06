import {HANDLER_ENTITY} from 'ngrx-entity-relationship';
import React, {ReactNode} from 'react';
import {connect, DefaultRootState} from 'react-redux';

import {
  relAddressCompany,
  relCompanyAddress,
  relCompanyAdmin,
  relCompanyStaff,
  rootUser,
  relUserCompany,
} from './store/reducers';
import {User} from './store/user/user.model';

// prettier-ignore
const user: HANDLER_ENTITY<User> = rootUser(
  relUserCompany(
    // // UNCOMMENT THIS
    // relCompanyStaff(
    //   relUserCompany(
    //     relCompanyAdmin(),
    //   ),
    // ),
    relCompanyAddress(
      // // UNCOMMENT THIS
      // relAddressCompany(
      //   relCompanyAdmin(
      //     relUserCompany(
      //       relCompanyAddress(),
      //     ),
      //   ),
      // ),
    ),
  ),
);

class MyComponent extends React.Component<{
  user?: User;
}> {
  public render(): ReactNode {
    return (
      <div>
        <h2>User</h2>
        <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
      </div>
    );
  }

  public componentWillUnmount(): void {
    user.release();
  }
}

const mapStateToProps = (state: DefaultRootState) => {
  return {
    user: user(state, '1'),
  };
};

export default connect(mapStateToProps)(MyComponent);
