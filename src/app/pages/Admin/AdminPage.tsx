// import { useDispatch } from 'react-redux'

// import { test } from 'app/store/panels/panelsSlice'
import { PageWrapper } from 'app/components/PageWrapper'
import { PanelCreator } from 'app/features/panels/PanelCreator'

export const AdminPage = () => {
  // const dispatch = useDispatch()
  return (
    <div data-testid="admin-page">
      <PageWrapper>
        <PanelCreator />
      </PageWrapper>
    </div>
  )
}
