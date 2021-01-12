/**
 * tailwind.config.js
 *
 * Plugins
 * - TailwindCSS Transitions / https://github.com/benface/tailwindcss-transitions
 */
const { colors } = require('tailwindcss/defaultTheme')
// const fontBaseSize = 14

/**
 * convertPxToEms
 * Handles converting the px to ems
 * @param {int} val is the value to be calculated
 * @param {int} baseSize is base size to base the calculations from
 */
// const convertPxToEms = (val, baseSize = 14) => `${val / baseSize}em`

/**
 * @param {int} totalSizes is the total number of fonts to generate
 * @param {int} fontBaseSize is font base size to start the calculations from
 * @param {int} startingValue is the starting value (or the font sizes to skip)
 *                            ex. Not typically important to have a font size of 1px
 */
// function getFontSizes(totalSizes = 250, fontBaseSize = 14, startingValue = 8) {
//   // The following generates an array of increasing values from the totalSizes above.
//   const fontSizeArray = Array.from(Array(totalSizes + 1).keys())
//   const fontSizeArraySliced = fontSizeArray.slice(
//     startingValue,
//     fontSizeArray.length
//   )

//   // Traverse the array and generate font sizes in ems based on the base pixel value.
//   return fontSizeArraySliced.map((i, x) => convertPxToEms(i, fontBaseSize))
// }

// const fontSizes = getFontSizes(250, fontBaseSize, 8)

module.exports = {
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      xxl: '1800px',
    },
    scale: {
      0: '0',
      10: '.10',
      20: '.20',
      25: '.25',
      50: '.5',
      75: '.75',
      90: '.9',
      95: '.95',
      100: '1',
      105: '1.05',
      110: '1.1',
      125: '1.25',
      150: '1.5',
      200: '2',
    },
    minHeight: {
      0: '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      20: '20px',
      40: '40px',
      60: '60px',
      80: '80px',
      100: '100px',
      125: '125px',
      150: '150px',
      175: '175px',
      full: '100%',
      screen: '100vh',
    },
    textIndent: {
      1: '0.25rem',
      2: '0.5rem',
    },
    transitionProperty: {
      // defaults to these values
      none: 'none',
      all: 'all',
      color: 'color',
      bg: 'background-color',
      border: 'border-color',
      colors: ['color', 'background-color', 'border-color'],
      opacity: 'opacity',
      transform: 'transform',
    },
    transitionDuration: {
      // defaults to these values
      default: '250ms',
      0: '0ms',
      100: '100ms',
      250: '250ms',
      500: '500ms',
      750: '750ms',
      1000: '1000ms',
    },
    transitionTimingFunction: {
      // defaults to these values
      default: 'ease',
      linear: 'linear',
      ease: 'ease',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out',
    },
    transitionDelay: {
      // defaults to these values
      default: '0ms',
      0: '0ms',
      100: '100ms',
      250: '250ms',
      500: '500ms',
      750: '750ms',
      1000: '1000ms',
    },
    willChange: {
      // defaults to these values
      auto: 'auto',
      scroll: 'scroll-position',
      contents: 'contents',
      opacity: 'opacity',
      transform: 'transform',
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        // https://coolors.co/011627-fdfffc-2ec4b6-e71d36-ff9f1c
        accent0: '#011627',
        accent1: '#FDFFFC',
        accent2: '#2EC4B6',
        accent3: '#E71D36',
        accent4: '#FF9F1C',
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        gray: {
          f3: '#f3f3f3',
          f4: '#f4f4f4',
          f6: '#f6f6f6',
          fb: '#FBFBFB',
          c4: '#C4C4C4',
          cd: '#CDCDCD',
          e4: '#E4E4E4',
          e5: '#E5E5E5',
          94: '#949494',
        },
        blue: {
          ...colors.blue,
          '00': '#003DD0',
          17: '#178EFF',
        },
        purple: {
          ...colors.purple,
          77: '#777dff',
          86: '#860DFF',
        },
        orange: {
          ...colors.orange,
          ff: '#FFCAC1',
          fc: '#FCB3A7',
        },
        red: {
          ...colors.red,
          fe: '#FE0000',
        },
        pink: {
          ...colors.pink,
          ff: '#FF9EE3',
          f0: '#f0357c',
        },
      },
      fontFamily: {
        sans: ['poppins', 'Helvetica', 'Arial', 'sans-serif'],
        menlo: [
          'Menlo',
          'Monaco',
          'Lucida Console',
          'Liberation Mono',
          'DejaVu Sans Mono',
          'Bitstream Vera Sans Mono',
          'Courier New',
          'monospace',
        ],
      },
      borderWidth: {
        default: '1px',
        0: '0',
        2: '2px',
        3: '3px',
        4: '4px',
        6: '6px',
        8: '8px',
      },
      letterSpacing: {
        tightest: '-.075em',
        tighter: '-.05em',
        tight: '-.025em',
        normal: '0',
        wide: '.025em',
        wider: '.05em',
        widest: '.25em',
      },
      height: {
        screen: '100vh',
        full: '100%',
        0: '0',
        5: '5px',
        10: '10px',
        15: '15px',
        20: '20px',
        22: '22px',
        24: '24px',
        25: '25px',
        30: '30px',
        35: '35px',
        38: '38px',
        40: '40px',
        45: '45px',
        46: '46px',
        48: '48px',
        49: '49px',
        50: '50px',
        52: '52px',
        55: '55px',
        60: '60px',
        70: '70px',
        72: '72px',
        74: '74px',
        80: '80px',
        82: '82px',
        84: '84px',
        90: '90px',
        92: '92px',
        100: '100px',
        110: '110px',
        120: '120px',
        130: '130px',
        140: '140px',
        150: '150px',
        160: '160px',
        170: '170px',
        180: '180px',
        190: '190px',
        200: '200px',
        210: '210px',
        220: '220px',
        230: '230px',
        240: '240px',
        250: '250px',
      },
      spacing: {
        0: '0',
        5: '5px',
        10: '10px',
        15: '15px',
        16: '16px',
        17: '17px',
        18: '18px',
        19: '19px',
        20: '20px',
        22: '22px',
        24: '24px',
        25: '25px',
        26: '26px',
        27: '27px',
        28: '28px',
        29: '29px',
        30: '30px',
        35: '35px',
        38: '38px',
        40: '40px',
        45: '45px',
        46: '46px',
        48: '48px',
        49: '49px',
        50: '50px',
        52: '52px',
        55: '55px',
        60: '60px',
        70: '70px',
        72: '72px',
        74: '74px',
        80: '80px',
        82: '82px',
        84: '84px',
        90: '90px',
        92: '92px',
        100: '100px',
        110: '110px',
        120: '120px',
        130: '130px',
        140: '140px',
        150: '150px',
        160: '160px',
        170: '170px',
        180: '180px',
        190: '190px',
        200: '200px',
        210: '210px',
        220: '220px',
        230: '230px',
        240: '240px',
        250: '250px',
      },
      //   fontSize: {
      //     base: `${fontBaseSize}px`,
      //     ...fontSizes,
      //     '244': '17.423em',
      //   },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    fontStyle: ['responsive', 'focus', 'hover', 'active'],
    textColor: ['responsive', 'focus', 'hover', 'active'],
    borderColor: ['responsive', 'focus', 'hover', 'active'],
    willChange: ['responsive'],
  },
  plugins: [],
}
