import { useDispatch } from 'react-redux'

import { test } from 'app/store/panels/panelsSlice'

export const AdminPage = () => {
  const dispatch = useDispatch()
  return (
    <div>
      Admin page
      <button onClick={() => dispatch(test())}>increment</button>
    </div>
  )
}
