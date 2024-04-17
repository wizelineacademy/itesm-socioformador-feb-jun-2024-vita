import { GenderPortions } from "./datatypes/portion";

const calories_portions: GenderPortions = {
    "F": {
        "decrease": {
            1200: {
                fruits: 4,
                vegetables: 3,
                legumes: 1,
                meat: 6,
                milk: 1,
                cereals: 4,
                sugar: 0,
                fat: 3
            },
            1300: {
                fruits: 4,
                vegetables: 4,
                legumes: 2,
                meat: 9,
                milk: 0,
                cereals: 4,
                sugar: 0,
                fat: 3
            },
            1400: {
                fruits: 4,
                vegetables: 4,
                legumes: 2,
                meat: 9,
                milk: 1,
                cereals: 5,
                sugar: 0,
                fat: 3
            },
            1500: {
                fruits: 4,
                vegetables: 4,
                legumes: 3,
                meat: 9,
                milk: 1,
                cereals: 6,
                sugar: 0,
                fat: 3
            }
        },
        "increase": {
            1500: {
                fruits: 4,
                vegetables: 4,
                legumes: 3,
                meat: 9,
                milk: 1,
                cereals: 6,
                sugar: 0,
                fat: 3
            },
            1600: {
                fruits: 4,
                vegetables: 4,
                legumes: 3,
                meat: 9,
                milk: 1,
                cereals: 7,
                sugar: 0,
                fat: 3
            },
            1700: {
                fruits: 4,
                vegetables: 4,
                legumes: 3,
                meat: 9,
                milk: 1,
                cereals: 7,
                sugar: 0,
                fat: 3
            }
        }
    },
    "M": {
        "decrease": {
            1500: {
                fruits: 4,
                vegetables: 4,
                legumes: 2,
                meat: 9,
                milk: 1,
                cereals: 6,
                sugar: 0,
                fat: 3
            },
            1600: {
                fruits: 4,
                vegetables: 4,
                legumes: 2,
                meat: 9,
                milk: 1,
                cereals: 7,
                sugar: 0,
                fat: 3
            },
            1700: {
                fruits: 4,
                vegetables: 4,
                legumes: 3,
                meat: 9,
                milk: 1,
                cereals: 7,
                sugar: 0,
                fat: 3
            },
            1800: {
                fruits: 4,
                vegetables: 4,
                legumes: 3,
                meat: 9,
                milk: 1,
                cereals: 8,
                sugar: 0,
                fat: 3
            }
        },
        "increase": {
            1700: {
                fruits: 4,
                vegetables: 4,
                legumes: 3,
                meat: 9,
                milk: 1,
                cereals: 7,
                sugar: 0,
                fat: 3
            },
            1800: {
                fruits: 4,
                vegetables: 4,
                legumes: 3,
                meat: 9,
                milk: 1,
                cereals: 8,
                sugar: 0,
                fat: 3
            },
            2000: {
                fruits: 4,
                vegetables: 4,
                legumes: 3,
                meat: 13,
                milk: 1,
                cereals: 8,
                sugar: 0,
                fat: 3
            },
            2500: {
                fruits: 5,
                vegetables: 4,
                legumes: 3,
                meat: 13,
                milk: 2,
                cereals: 10,
                sugar: 0,
                fat: 4
            },
            2700: {
                fruits: 5,
                vegetables: 4,
                legumes: 3,
                meat: 16,
                milk: 2,
                cereals: 10,
                sugar: 0,
                fat: 4
            }
        }
    }
    
}

export default calories_portions;