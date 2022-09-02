import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import { ISklad } from '../../types/IServerData';
import { PopoverSklad, PopoverSkladProps } from '../Modal/PopoverSklad';

interface BtnStackProps extends PopoverSkladProps {
    sklads: ISklad[]
    children?: React.ReactNode
}

export const BtnsStack: React.FC<BtnStackProps> = ({ sklads }): JSX.Element => {
    return (<VStack spacing={4}>

        <PopoverSklad sklads={sklads} />

        <Button>
            Create Warehouse Item
        </Button>
        <Button>
            Delete Warehouse Item
        </Button>
        <Button bg={'red.300'}
        >
            DELETE ALL WAREHOUSE
        </Button>
    </VStack>);
}
