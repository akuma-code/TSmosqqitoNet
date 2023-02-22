import React from 'react';
import { Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react';
import { OfferFormData } from './OfferTypes';

type TagSelectProps = {
    changeTag: (value: OfferFormData['companyTag']) => void;
    tag: OfferFormData['companyTag'];
};
export const TagSelect: React.FC<TagSelectProps> = (props) => {

    const { tag, changeTag } = props;


    return (
        <Menu>
            <MenuButton tabIndex={-1} autoFocus={false} as={Button}
                w='full'
                bgColor={'blue.300'}
                _active={{ bgColor: 'transparent' }}
                _focus={{ bgColor: 'transparent' }}
                _hover={{ bgColor: "blue.300" }}
                border={'2px solid black'}
            >{tag}</MenuButton>
            <MenuList
                w={'fit-content'}
            >
                <MenuOptionGroup defaultValue='ООО' type='radio'
                >
                    <MenuItemOption
                        _hover={{ bgColor: "blue.300" }}
                        _focus={{ bgColor: 'blue.300' }}
                        value='ООО'
                        onClick={() => changeTag('ООО')}
                    >ООО
                    </MenuItemOption>
                    <MenuItemOption
                        _hover={{ bgColor: "blue.300" }}
                        _focus={{ bgColor: 'blue.300' }}
                        value='ИП'
                        onClick={() => changeTag('ИП')}
                    >ИП
                    </MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
        </Menu>);
};
