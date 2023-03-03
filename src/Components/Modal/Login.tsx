import { Button, HStack, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { login } from '../../http/UsersApi'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
} from '@chakra-ui/react'
import { useToggle } from '../../hooks/useToggle'
export const Login = () => {
    const [pass, setPass] = useState("")
    const { setAuth } = useAuth()
    const [open, setOpen] = useToggle(false)
    const onLogin = async () => {
        const form = new FormData()
        form.append("password", pass)
        await login(form).then(res => localStorage.setItem("isAuth", res))
        const auth = JSON.parse(localStorage.getItem("isAuth") || "false")
        if (auth) localStorage.setItem("isAuth", "true")
        else localStorage.setItem("isAuth", "false")
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
                    // mt={3}
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
