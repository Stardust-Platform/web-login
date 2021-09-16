import React, { FC } from 'react';
import * as ReactDOM from 'react-dom';
import StardustAuth, { AuthProvider, useAuthContext } from '..';

const App: FC = () => {
  const { user } = useAuthContext();
  return (
    <AuthProvider>
      <div>
        {user}
        <StardustAuth />
      </div>
    </AuthProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
