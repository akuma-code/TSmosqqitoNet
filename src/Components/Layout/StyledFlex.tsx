import React from 'react'
import styled from 'styled-components'

interface FlexProps {
  dir?: string;
  justify?: string;
  align?: string;
  bg?: string;
  margin?: string
  children?: React.ReactNode
}



const StyledDisplay = styled.div<FlexProps>`
display: flex;
flex-direction: ${props => props.dir || 'row'};
align-items: ${props => props.align || 'stretch'};
justify-content: ${props => props.justify || 'stretch'};
margin:${({ margin }) => margin || '4px'} ;
background-color: ${props => props.bg || "#fff"};
gap:1rem;
`
const StyledFlex = (props: FlexProps) => {
  return (
    <StyledDisplay {...props} />


  )
}

