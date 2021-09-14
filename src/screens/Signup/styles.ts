import styled from 'styled-components/macro'

export const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`

export const Form = styled.form`
  border: 1px solid black;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
