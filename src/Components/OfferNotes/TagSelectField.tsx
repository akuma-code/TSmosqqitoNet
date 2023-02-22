import React from 'react';
import { Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react';
import { OfferFormData } from './OfferTypes';

type TagSelectProps = {
    changeTag?: (value: keyof OfferFormData) => void
    tag: keyof OfferFormData
    tags: Array<keyof OfferFormData>
};
export const TagSelectField: React.FC<TagSelectProps> = (props) => {

    const { tag, tags, changeTag } = props;


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
                    {
                        tags.map(t =>

                            <MenuItemOption
                                _hover={{ bgColor: "blue.300" }}
                                _focus={{ bgColor: 'blue.300' }}
                                value={t}
                                onClick={() => { }}
                            >{t}
                            </MenuItemOption>

                        )
                    }
                </MenuOptionGroup>
            </MenuList>
        </Menu>);
};
