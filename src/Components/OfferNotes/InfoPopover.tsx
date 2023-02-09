import { Button, ButtonProps, Flex, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Stack, Text, Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { GrDocumentMissing, GrDocumentTransfer, GrDocumentVerified } from "react-icons/gr";
import { IconType } from 'react-icons/lib';
import { OfferCardProps } from './OfferTypes';
import { FcApproval } from "react-icons/fc";
type InfoPopoverProps = {
    offer: OfferCardProps['offer']
    controlFn: OfferCardProps['offControl']
    children?: React.ReactNode
    onMove: (id: string) => void
}

export const InfoPopover: React.FC<InfoPopoverProps> = (props) => {
    const { offer, children, controlFn, onMove } = props
    const isReady = offer.isDocSigned && offer.isRequested
    const getO = controlFn.getOffer(offer.id)
    return (
        <Popover placement='right'>
            <PopoverTrigger>
                {children}
            </PopoverTrigger>

            <PopoverContent >
                <PopoverArrow />
                <PopoverCloseButton placeSelf={'flex-end'} size={'md'} />
                <PopoverHeader>
                    {!isReady ?
                        "Ход договора"
                        :
                        `${getO.companyName} можно закрывать!`
                    }
                </PopoverHeader>
                <PopoverBody>
                    <Stack spacing={4} align={'stretch'}>
                        {offer.isRequested &&
                            <Button
                                onClick={() => onMove!(offer.id)}
                                aria-label='finish offer'
                                size={'md'}
                                variant={'solid'}
                                colorScheme={'twitter'}
                            >
                                <Flex justifyContent={'space-between'} width='full' alignItems={'center'}>
                                    <Text mx={2}>Перенести в лист ожидания</Text>
                                    <FcApproval fontSize={20} />
                                </Flex>
                            </Button>
                        }
                        <CheckButton text={['Договор подписан!', 'Договор подписан?']}
                            IconOnCheck={GrDocumentVerified}
                            IconOnUncheck={GrDocumentMissing}
                            isCheck={offer.isDocSigned!}
                            onClick={() => controlFn.toggleCheck(offer.id, 'isDocSigned')}
                        />
                        <CheckButton text={['Закрывающие готовы!', 'Закрывающие не запрошены!']}
                            IconOnCheck={GrDocumentVerified}
                            IconOnUncheck={GrDocumentTransfer}
                            isCheck={offer.isRequested!}
                            onClick={() => controlFn.toggleCheck(offer.id, 'isRequested')}
                        />

                        <Button aria-label='delete offer' size={'md'} onClick={() => controlFn.Remove(offer.id)}
                            variant={'solid'}
                            colorScheme={'red'}
                        >
                            <Flex justifyContent={'space-between'} width='full' alignItems={'center'}>
                                <Text mx={2}>Удалить запись</Text> <AiOutlineCloseCircle fontSize={20} />
                            </Flex>

                        </Button>


                    </Stack>

                </PopoverBody>
                <PopoverFooter>
                    {offer.desc !== "" && offer.desc}
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    )
}
type CheckButtonProps = {
    text: string[],
    IconOnCheck: IconType,
    IconOnUncheck: IconType,
    isCheck: boolean
    onClick: () => void
}

const CheckButton: React.FC<CheckButtonProps> = ({ text, IconOnCheck, IconOnUncheck, isCheck, onClick }) => {
    return (
        <Button size={'md'} onClick={onClick}
            colorScheme={isCheck ? 'green' : 'red'}
            variant={isCheck ? 'solid' : 'outline'}
        >
            <Flex justifyContent={'space-between'} width='full' alignItems={'center'} >
                {isCheck ?
                    <Text>{text[0]}</Text>
                    :
                    <Text> {text[1]}</Text>
                }
                {isCheck ?
                    <IconOnCheck fontSize={20} />
                    :
                    <IconOnUncheck fontSize={20} />
                }
            </Flex>
        </Button>
    )
}