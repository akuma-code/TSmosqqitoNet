import { checkboxAnatomy as parts } from "@chakra-ui/anatomy"
import { extendTheme } from "@chakra-ui/react"
import {
    createMultiStyleConfigHelpers,
    defineStyle,
} from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(parts.keys)

// default base style from the Checkbox theme
const baseStyle = definePartsStyle({
    label: {
        fontFamily: "mono"
    },
    control: {
        padding: 3,
        borderRadius: 0
    }
})

// Defining a custom variant
const variantCircular = definePartsStyle({
    control: defineStyle({
        rounded: "full"
    })
})

const variants = {
    circular: variantCircular,
}

const sizes = {
    xl: definePartsStyle({
        control: defineStyle({
            boxSize: 14
        }),
        label: defineStyle({
            fontSize: "2xl",
            marginLeft: 6
        })
    })
}

export const customCBx = defineMultiStyleConfig({
    baseStyle,
    variants,
    sizes,
})

export const themeCBX = extendTheme({
    components: { Checkbox: { ...customCBx } },

})
