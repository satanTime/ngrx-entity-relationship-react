import {ngrxEntityRelationshipReducer} from 'ngrx-entity-relationship';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import MyComponent from './MyComponent';
import {EntityEffects} from './store/entity.effects';
import {EntityService} from './store/entity.service';
import {rootReducer} from './store/reducers';

const store = createStore(ngrxEntityRelationshipReducer(rootReducer));

const entityEffects = new EntityEffects(store);
const entityService = new EntityService(store);
entityEffects.address();
entityEffects.company();
entityEffects.user();

class App extends React.Component<any, {view: string}> {
  public state: {view: string} = {
    view: '',
  };

  public render(): React.ReactNode {
    return (
      <Provider store={store}>
        <div>
          <h2>Actions</h2>
          <button onClick={() => entityService.changeUser('1')}>Change user #1</button>
          <button onClick={() => entityService.changeUser('2')}>Change user #2</button>
          <button onClick={() => entityService.changeCompany('1')}>Change company #1</button>
          <button onClick={() => entityService.changeAddress('1')}>Change address #1</button>
        </div>
        <div>
          <MyComponent />
        </div>
      </Provider>
    );
  }
}

export default App;
