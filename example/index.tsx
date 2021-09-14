import React, { FC } from 'react'
import * as ReactDOM from 'react-dom'
import StardustAuth from '..'

const App: FC = () => (
  <div>
    <StardustAuth />
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
