import React from 'react';
import { Alert, AlertIcon, AlertTitle, Center, CloseButton } from '@chakra-ui/react';

export function Alarma(text: string, toggleAlert: () => void): React.ReactNode {
    return <Alert status='error'
        pos={'absolute'}
        zIndex={4} h={20}
        maxW={"70vw"}
        display={'flex'}
        justifyContent={'space-between'}
        variant='top-accent'
    >
        <Center textAlign={'center'}
            display='flex' justifyContent={'space-between'}
            mx='auto'
        >
            <AlertIcon mx={5} w={8} />
            <AlertTitle fontSize={24}>{text}</AlertTitle>
            <AlertIcon mx={5} w={8} />
        </Center>
        <CloseButton onClick={toggleAlert} right={0} size={'lg'} color={'black'} />
    </Alert>;
}
