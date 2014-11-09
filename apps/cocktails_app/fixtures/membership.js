sc_require('models/membership');

CocktailsApp.Membership.FIXTURES = [
    // Dry Martini
    {
        "id": 1,
        "cocktail": 1,
        "ingredient": 1,
        "amount": "1 2/3 oz.",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 2,
        "cocktail": 1,
        "ingredient": 2,
        "amount": "1/3 oz.",
        "list_index": 1,
        "substitute_index": 0
    },
    // Manhattan
    {
        "id": 3,
        "cocktail": 2,
        "ingredient": 3,
        "amount": "3/4 oz.",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 4,
        "cocktail": 2,
        "ingredient": 4,
        "amount": "1 1/2 oz.",
        "list_index": 1,
        "substitute_index": 0
    },
    // Martinez Cocktail
    {
        "id": 5,
        "cocktail": 3,
        "ingredient": 5,
        "amount": "1 dash",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 6,
        "cocktail": 3,
        "ingredient": 2,
        "amount": "1 oz.",
        "list_index": 1,
        "substitute_index": 0
    },
    {
        "id": 7,
        "cocktail": 3,
        "ingredient": 6,
        "amount": "1/4 tsp.",
        "list_index": 2,
        "substitute_index": 0
    },
    {
        "id": 8,
        "cocktail": 3,
        "ingredient": 1,
        "amount": "1 oz.",
        "list_index": 3,
        "substitute_index": 0
    },
    // Old-Fashioned
    {
        "id": 9,
        "cocktail": 4,
        "ingredient": 7,
        "amount": "1 cube",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 10,
        "cocktail": 4,
        "ingredient": 8,
        "amount": "1 dash",
        "list_index": 1,
        "substitute_index": 0
    },
    {
        "id": 11,
        "cocktail": 4,
        "ingredient": 9,
        "amount": "1 tsp.",
        "list_index": 2,
        "substitute_index": 0
    },
    {
        "id": 12,
        "cocktail": 4,
        "ingredient": 4,
        "amount": "2 oz.",
        "list_index": 3,
        "substitute_index": 0
    },
    // Brandy Cocktail
    {
        "id": 13,
        "cocktail": 5,
        "ingredient": 10,
        "amount": "2 oz.",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 14,
        "cocktail": 5,
        "ingredient": 11,
        "amount": "1/4 tsp.",
        "list_index": 1,
        "substitute_index": 0
    },
    {
        "id": 15,
        "cocktail": 5,
        "ingredient": 8,
        "amount": "2 dashes",
        "list_index": 2,
        "substitute_index": 0
    },
    // Margarita
    {
        "id": 16,
        "cocktail": 6,
        "ingredient": 12,
        "amount": "1 1/2 oz.",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 17,
        "cocktail": 6,
        "ingredient": 6,
        "amount": "1/2 oz.",
        "list_index": 1,
        "substitute_index": 0
    },
    {
        "id": 18,
        "cocktail": 6,
        "ingredient": 13,
        "amount": "1 oz.",
        "list_index": 2,
        "substitute_index": 0
    },
    {
        "id": 19,
        "cocktail": 6,
        "ingredient": 14,
        "amount": "1 oz.",
        "list_index": 2,
        "substitute_index": 0
    },
    // Daiquiri
    {
        "id": 20,
        "cocktail": 7,
        "ingredient": 15,
        "amount": "1",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 21,
        "cocktail": 7,
        "ingredient": 16,
        "amount": "1 tsp.",
        "list_index": 1,
        "substitute_index": 0
    },
    {
        "id": 22,
        "cocktail": 7,
        "ingredient": 17,
        "amount": "1 1/2 oz.",
        "list_index": 2,
        "substitute_index": 0
    },
    // Mint Julep
    {
        "id": 23,
        "cocktail": 8,
        "ingredient": 18,
        "amount": "4 sprigs",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 24,
        "cocktail": 8,
        "ingredient": 16,
        "amount": "1 tsp.",
        "list_index": 1,
        "substitute_index": 0
    },
    {
        "id": 25,
        "cocktail": 8,
        "ingredient": 9,
        "amount": "2 tsps.",
        "list_index": 2,
        "substitute_index": 0
    },
    {
        "id": 26,
        "cocktail": 8,
        "ingredient": 19,
        "amount": "1 1/2 oz.",
        "list_index": 3,
        "substitute_index": 0
    },
    // Sidecar Cocktail
    {
        "id": 27,
        "cocktail": 9,
        "ingredient": 20,
        "amount": "1/4",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 28,
        "cocktail": 9,
        "ingredient": 6,
        "amount": "1 oz.",
        "list_index": 1,
        "substitute_index": 0
    },
    {
        "id": 29,
        "cocktail": 9,
        "ingredient": 10,
        "amount": "1 oz.",
        "list_index": 2,
        "substitute_index": 0
    },
    // French "75"
    {
        "id": 30,
        "cocktail": 10,
        "ingredient": 20,
        "amount": "1",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 31,
        "cocktail": 10,
        "ingredient": 16,
        "amount": "2 tsps.",
        "list_index": 1,
        "substitute_index": 0
    },
    {
        "id": 32,
        "cocktail": 10,
        "ingredient": 1,
        "amount": "2 oz.",
        "list_index": 2,
        "substitute_index": 0
    },
    {
        "id": 33,
        "cocktail": 10,
        "ingredient": 21,
        "amount": "as desired",
        "list_index": 3,
        "substitute_index": 0
    },
    // Bloody Mary
    {
        "id": 34,
        "cocktail": 11,
        "ingredient": 20,
        "amount": "1 1/2 oz.",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 35,
        "cocktail": 11,
        "ingredient": 22,
        "amount": "3 oz.",
        "list_index": 1,
        "substitute_index": 0
    },
    {
        "id": 36,
        "cocktail": 11,
        "ingredient": 23,
        "amount": "1 dash",
        "list_index": 2,
        "substitute_index": 0
    },
    {
        "id": 37,
        "cocktail": 11,
        "ingredient": 24,
        "amount": "1/2 tsp.",
        "list_index": 3,
        "substitute_index": 0
    },
    {
        "id": 38,
        "cocktail": 11,
        "ingredient": 25,
        "amount": "2-3 drops",
        "list_index": 4,
        "substitute_index": 0
    },
    {
        "id": 39,
        "cocktail": 11,
        "ingredient": 26,
        "amount": "as desired",
        "list_index": 5,
        "substitute_index": 0
    },
    // Irish Coffee
     {
        "id": 40,
        "cocktail": 12,
        "ingredient": 27,
        "amount": "1 1/2 oz.",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 41,
        "cocktail": 12,
        "ingredient": 28,
        "amount": "as desired",
        "list_index": 1,
        "substitute_index": 0
    },
    // Jack Rose Cocktail
    {
        "id": 42,
        "cocktail": 13,
        "ingredient": 29,
        "amount": "1 1/2 oz.",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 43,
        "cocktail": 13,
        "ingredient": 15,
        "amount": "1/2",
        "list_index": 1,
        "substitute_index": 0
    },
    {
        "id": 44,
        "cocktail": 13,
        "ingredient": 30,
        "amount": "1 tsp.",
        "list_index": 2,
        "substitute_index": 0
    },
    // Negroni
    {
        "id": 45,
        "cocktail": 14,
        "ingredient": 1,
        "amount": "3/4 oz.",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 46,
        "cocktail": 14,
        "ingredient": 31,
        "amount": "3/4 oz.",
        "list_index": 1,
        "substitute_index": 0
    },
    {
        "id": 47,
        "cocktail": 14,
        "ingredient": 3,
        "amount": "3/4 oz.",
        "list_index": 2,
        "substitute_index": 0
    },
    {
        "id": 48,
        "cocktail": 14,
        "ingredient": 2,
        "amount": "3/4 oz.",
        "list_index": 2,
        "substitute_index": 0
    },
    {
        "id": 49,
        "cocktail": 14,
        "ingredient": 32,
        "amount": "1 splash (optional)",
        "list_index": 3,
        "substitute_index": 0
    },
    // Whiskey Sour
    {
        "id": 50,
        "cocktail": 15,
        "ingredient": 20,
        "amount": "1/2",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 51,
        "cocktail": 15,
        "ingredient": 16,
        "amount": "1/2 tsp.",
        "list_index": 1,
        "substitute_index": 0
    },
    {
        "id": 52,
        "cocktail": 15,
        "ingredient": 4,
        "amount": "2 oz.",
        "list_index": 2,
        "substitute_index": 0
    },
    // Mai-Tai
    {
        "id": 53,
        "cocktail": 16,
        "ingredient": 16,
        "amount": "1/2 tsp.",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 54,
        "cocktail": 16,
        "ingredient": 17,
        "amount": "2 oz.",
        "list_index": 1,
        "substitute_index": 0
    },
    {
        "id": 55,
        "cocktail": 16,
        "ingredient": 6,
        "amount": "1 oz.",
        "list_index": 2,
        "substitute_index": 0
    },
    {
        "id": 56,
        "cocktail": 16,
        "ingredient": 33,
        "amount": "1 tbsp.",
        "list_index": 3,
        "substitute_index": 0
    },
    {
        "id": 57,
        "cocktail": 16,
        "ingredient": 34,
        "amount": "1 tbsp.",
        "list_index": 3,
        "substitute_index": 0
    },
    {
        "id": 58,
        "cocktail": 16,
        "ingredient": 30,
        "amount": "1 tbsp.",
        "list_index": 4,
        "substitute_index": 0
    },
    {
        "id": 59,
        "cocktail": 16,
        "ingredient": 14,
        "amount": "1 tbsp.",
        "list_index": 5,
        "substitute_index": 0
    },
    // Planters Punch No. 1
    {
        "id": 60,
        "cocktail": 17,
        "ingredient": 15,
        "amount": "2",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 61,
        "cocktail": 17,
        "ingredient": 16,
        "amount": "2 tsps.",
        "list_index": 1,
        "substitute_index": 0
    },
    {
        "id": 62,
        "cocktail": 17,
        "ingredient": 32,
        "amount": "2 oz.",
        "list_index": 2,
        "substitute_index": 0
    },
    {
        "id": 63,
        "cocktail": 17,
        "ingredient": 8,
        "amount": "2 dashes",
        "list_index": 3,
        "substitute_index": 0
    },
    {
        "id": 64,
        "cocktail": 17,
        "ingredient": 17,
        "amount": "2 1/2 oz.",
        "list_index": 4,
        "substitute_index": 0
    },
    {
        "id": 65,
        "cocktail": 17,
        "ingredient": 30,
        "amount": "1 dash",
        "list_index": 5,
        "substitute_index": 0
    },
    // Planters Punch No. 2
    {
        "id": 66,
        "cocktail": 18,
        "ingredient": 15,
        "amount": "1",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 67,
        "cocktail": 18,
        "ingredient": 20,
        "amount": "1/2",
        "list_index": 1,
        "substitute_index": 0
    },
    {
        "id": 68,
        "cocktail": 18,
        "ingredient": 35,
        "amount": "1/2",
        "list_index": 2,
        "substitute_index": 0
    },
    {
        "id": 69,
        "cocktail": 18,
        "ingredient": 36,
        "amount": "1 tsp.",
        "list_index": 3,
        "substitute_index": 0
    },
    {
        "id": 70,
        "cocktail": 18,
        "ingredient": 17,
        "amount": "2 oz.",
        "list_index": 4,
        "substitute_index": 0
    },
    {
        "id": 71,
        "cocktail": 18,
        "ingredient": 37,
        "amount": "1 oz.",
        "list_index": 5,
        "substitute_index": 0
    },
    {
        "id": 72,
        "cocktail": 18,
        "ingredient": 6,
        "amount": "2 dashes",
        "list_index": 6,
        "substitute_index": 0
    },
    {
        "id": 73,
        "cocktail": 18,
        "ingredient": 30,
        "amount": "1 dash",
        "list_index": 7,
        "substitute_index": 0
    },
    // Cosmopolitan Cocktail
    {
        "id": 74,
        "cocktail": 19,
        "ingredient": 22,
        "amount": "1 1/4 oz.",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 75,
        "cocktail": 19,
        "ingredient": 14,
        "amount": "1/4 oz.",
        "list_index": 1,
        "substitute_index": 0
    },
    {
        "id": 76,
        "cocktail": 19,
        "ingredient": 6,
        "amount": "1/4 oz.",
        "list_index": 2,
        "substitute_index": 0
    },
    {
        "id": 77,
        "cocktail": 19,
        "ingredient": 38,
        "amount": "1/4 oz.",
        "list_index": 3,
        "substitute_index": 0
    },
    {
        "id": 78,
        "cocktail": 19,
        "ingredient": 39,
        "amount": "1 cup",
        "list_index": 4,
        "substitute_index": 0
    },
    // Tom Collins
    {
        "id": 79,
        "cocktail": 20,
        "ingredient": 20,
        "amount": "1/2",
        "list_index": 0,
        "substitute_index": 0
    },
    {
        "id": 80,
        "cocktail": 20,
        "ingredient": 16,
        "amount": "1 tsp.",
        "list_index": 1,
        "substitute_index": 0
    },
    {
        "id": 81,
        "cocktail": 20,
        "ingredient": 1,
        "amount": "2 oz.",
        "list_index": 2,
        "substitute_index": 0
    },
    {
        "id": 82,
        "cocktail": 20,
        "ingredient": 32,
        "amount": "as desired",
        "list_index": 3,
        "substitute_index": 0
    }
]