import { Button, HStack, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { login } from '../../http/UsersApi'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from '@chakra-ui/react'
import { useToggle } from '../../hooks/useToggle'
export const Login = () => {
    const [pass, setPass] = useState("")
    const { isAuth, setAuth } = useAuth()
    const [open, setOpen] = useToggle(false)
    const onLogin = async () => {
        const form = new FormData()
        form.append("password", pass)
        const lg = await login(form)
        const auth = JSON.parse(lg)
        setOpen.off()
        setAuth(auth)
        setPass("")
    }

    return (
        <Popover
            placement='auto'
            closeOnBlur
            isOpen={open}
        >
            <PopoverTrigger>

                <Button
                    variant={'link'}
                    colorScheme='white'
                    fontSize={32}
                    size={'lg'}
                    mr={5}
                    mt={3}
                    onClick={setOpen.on}
                >
                    Войти
                </Button>
            </PopoverTrigger>
            <PopoverContent

            >
                <PopoverBody>
                    <HStack>

                        <Input
                            textColor={'black'}
                            value={pass}
                            onChange={(e) => { setPass(e.target.value) }}
                            type='password'
                            required
                        />

                        <Button
                            colorScheme='green'
                            type='button'
                            onClick={onLogin}
                        >
                            OK
                        </Button>
                    </HStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>


    )
}
