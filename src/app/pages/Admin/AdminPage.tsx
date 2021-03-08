import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  addPanel,
  panelsSelector,
  setActivePanelId,
  activePanelIdSelector
} from 'app/store/panels'
import { PageWrapper } from 'app/components/PageWrapper'
import { Panel } from 'app/features/panels/Panel'
import { PanelEditor } from 'app/features/panels/PanelEditor'

export const AdminPage = () => {
  const dispatch = useDispatch()
  const panels = useSelector(panelsSelector)
  const activePanelId = useSelector(activePanelIdSelector)
  const [openedPanelEditor, setOpenedPanelEditor] = useState(false)

  const handleAddPanel = () => {
    dispatch(
      addPanel({
        id: Math.random().toString(),
        rect: { x: 100, y: 100, height: 600, width: 300 }
      })
    )
  }

  const handlePanelClick = (id: string) => {
    dispatch(setActivePanelId(id))
  }

  return (
    <div data-testid="admin-page">
      <PageWrapper>
        <button onClick={handleAddPanel}>Add panel</button>
        <button onClick={() => setOpenedPanelEditor(prev => !prev)}>
          toggle panel editor
        </button>
        {panels.map(panel => (
          <Panel
            key={panel.id}
            active={activePanelId === panel.id}
            onClick={handlePanelClick}
            {...panel}
          />
        ))}

        <PanelEditor open={openedPanelEditor} />
      </PageWrapper>
    </div>
  )
}
