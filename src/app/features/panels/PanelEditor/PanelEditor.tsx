import { FC } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div<PanelEditorProps>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${({ open }) => (open ? `200px` : 0)};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray};
`

const dataTestIdPrefix = 'panel-editor'
export const dataTestIds = {
  container: dataTestIdPrefix
}

type PanelEditorProps = {
  open?: boolean
}

export const PanelEditor: FC<PanelEditorProps> = ({ open = false }) => {
  return (
    <Wrapper data-testid="panel-editor" open={open}>
      panel editor
    </Wrapper>
  )
}
