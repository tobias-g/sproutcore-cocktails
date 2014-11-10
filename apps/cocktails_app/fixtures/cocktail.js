sc_require('models/cocktail');

CocktailsApp.Cocktail.FIXTURES = [
    {
        "id": 1,
        "name": "Dry Martini",
        "description": "Stir vermouth and gin over ice cubes in mixing glass. Strain into " +
        "cocktail glass. Serve with a twist of lemon peel or olive, if desired.",
        "memberships": [
            1,
            2
        ]
    },
    {
        "id": 2,
        "name": "Manhattan",
        "description": "Stir with ice and strain into cocktail glass. Serve with a cherry.",
        "memberships": [
            3,
            4
        ]
    },
    {
        "id": 3,
        "name": "Martinez Cocktail",
        "description": "Stir with ice and strain into cocktail glass. Serve with a cherry.",
        "memberships": [
            5,
            6,
            7,
            8
        ]
    },
    {
        "id": 4,
        "name": "Old-Fashioned",
        "description": "In old-fashioned glass, put sugar cube, bitters, and water and muddle " +
        "well. Add whiskey, stir. Add a twist of lemon peel and ice cubes. Decorate with slices " +
        "of orange and lemon and a cherry. Serve with a swizzle stick.",
        "memberships": [
            9,
            10,
            11,
            12
        ]
    },
    {
        "id": 5,
        "name": "Brandy Cocktail",
        "description": "Stir ingredients with ice and strain into cocktail glass. Add a twist of lemon peel.",
        "memberships": [
            13,
            14,
            15
        ]
    },
    {
        "id": 6,
        "name": "Margarita",
        "description": "Rub rim of cocktail glass with rind of a lemon or lime, dip rim in salt. Shake " +
        "ingredients with ice and strain into salt-rimmed glass.",
        "memberships": [
            16,
            17,
            18,
            19
        ]
    },
    {
        "id": 7,
        "name": "Daiquiri",
        "description": "Shake with ice and strain into cocktail glass.",
        "memberships": [
            20,
            21,
            22
        ]
    },
    {
        "id": 8,
        "name": "Mint Julep",
        "description": "In silver julep cup, silver mug, or collins glass, muddle mint leaves, powdered " +
        "sugar and water. Fill glass or mug with shaved or crushed ice and add bourbon. Top with more ice " +
        "and garnish with a mint spring and straws.",
        "memberships": [
            23,
            24,
            25,
            26
        ]
    },
    {
        "id": 9,
        "name": "Sidecar Cocktail",
        "description": "Shake with ice and strain into cocktail glass.",
        "memberships": [
            27,
            28,
            29
        ]
    },
    {
        "id": 10,
        "name": "French \"75\"",
        "description": "Stir in collins glass. Then add ice cubes, fill with champagne and stir. Decorate " +
        "with a slice of lemon or orange and cherry. Serve with straws.",
        "memberships": [
            30,
            31,
            32,
            33
        ]
    },
    {
        "id": 11,
        "name": "Bloody Mary",
        "description": "Shake with ice and strain into old-fashioned glass over ice cubes. A wedge of lime may " +
        "be added.",
        "memberships": [
            34,
            35,
            36,
            37,
            38,
            39
        ]
    },
    {
        "id": 12,
        "name": "Irish Coffee",
        "description": "Into Irish coffee glass rimmed with sugar, pour Irish whiskey. Fill to within half an inch " +
        "of top with coffee. Cover surface to brim with whipped cream.",
        "memberships": [
            40,
            41
        ]
    },
    {
        "id": 13,
        "name": "Jack Rose Cocktail",
        "description": "Shake with ice and strain into cocktail glass.",
        "memberships": [
            42,
            43,
            44
        ]
    },
    {
        "id": 14,
        "name": "Negroni",
        "description": "Stir with ice and strain into cocktail glass, or into old-fashioned glass over ice cubes, " +
        "with or without a splash of club soda. Add a twist of lemon peel.",
        "memberships": [
            45,
            46,
            47,
            48,
            49
        ]
    },
    {
        "id": 15,
        "name": "Whiskey Sour",
        "description": "Shake with ice and strain into sour glass. Decorate with half a slice of lemon and a cherry.",
        "memberships": [
            50,
            51,
            52
        ]
    },
    {
        "id": 16,
        "name": "Mai-Tai",
        "description": "Shake with ice and strain into large old-fashioned glass about 1/3 full with crushed ice. " +
        "Decorate with a maraschino cherry speared to a wedge of fresh pineapple. For a hair raiser, top with a " +
        "dash of 151-proof rum; for a true Polynesian effect, float an orchid on each drink. Serve with straws.",
        "memberships": [
            53,
            54,
            55,
            56,
            57,
            58,
            59
        ]
    },
    {
        "id": 17,
        "name": "Planters Punch No. 1",
        "description": "Mix first three ingredients in collins glass, add ice cubes, and stir until glass is frosted. " +
        "Add bitters and rum. Stir and top with grenadine. Decorate with slices of lemon, orange, and pineapple, and " +
        "a cherry. Serve with straws.",
        "memberships": [
            60,
            61,
            62,
            63,
            64,
            65
        ]
    },
    {
        "id": 18,
        "name": "Planters Punch No. 2",
        "description": "Pour first five ingredients into collins glass filled with ice. Stir until glass is frosted. " +
        "Add Jamaican Rum, stir, and top with triple sec and grenadine. Decorate with slices of orange, lemon, and " +
        "pineapple, a cherry, and a sprig of mint dipped in powdered sugar. Serve with a straw.",
        "memberships": [
            66,
            67,
            68,
            69,
            70,
            71,
            72,
            73
        ]
    },
    {
        "id": 19,
        "name": "Cosmopolitan Cocktail",
        "description": "In a cocktail glass shaker, combine all ingredients. Shake well and strain into a Martini glass. " +
        "Garnish with a lime wedge.",
        "memberships": [
            74,
            75,
            76,
            77,
            78
        ]
    },
    {
        "id": 20,
        "name": "Tom Collins",
        "description": "Shake with ice and strain into collins glass. Add several ice cubes, fill with club soda, and " +
        "stir. Decorate with slices of lemon and orange and a cherry. Serve with straw.",
        "memberships": [
            79,
            80,
            81,
            82
        ]
    }
]