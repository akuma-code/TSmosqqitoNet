import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const baseStyle = definePartsStyle({
    // define the part you're going to style
    label: {
        fontFamily: 'mono', // change the font family of the label
        fontSize: '5em'
    },
    control: {
        padding: 3, // change the padding of the control
        borderRadius: 5, // change the border radius of the control
        bgColor: "green.900"
    },
    container: {
        width: "fit-content"
    }
})
const akumaStyle = definePartsStyle({
    // define the part you're going to style
    label: {
        fontSize: '5em'
    },
    control: {
        padding: 1, // change the padding of the control
        borderRadius: 5, // change the border radius of the control
        bgColor: "green.900"
    },
    container: {
        width: "fit-content",
        bgColor: 'red'
    }
})

export const checkboxTheme = defineMultiStyleConfig({ variants: { akumaStyle } })



export const theme = extendTheme({
    components: { Checkbox: { checkboxTheme } },

})