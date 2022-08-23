import React, { FC } from 'react'
import { Box, Button, Container, Text } from '@chakra-ui/react'
import { useToggle } from '../../hooks/useToggle'




export const PageTesting: FC = (): JSX.Element => {
    const [text, setTextToggle] = useToggle()


    return (
        <Container >
            <Box bgColor={'gray'} onClick={() => setTextToggle.toggle}>
                <span className='grey lighten-3 blue-text'>span</span>
                <Button fontSize={'60'} color={'red'}
                    onClick={setTextToggle.toggle}
                >TEST</Button>
                <div>{text ? "FALSE" : "TRUE"}</div>
            </Box>



        </Container>
    )
}
