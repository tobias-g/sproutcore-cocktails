/**
 * Here we define our SVG icons configuration properties such as where
 * the SVG file for an icon is stored and if any exist the animation
 * states and paths to get to those states
 * @type {Object}
 */
var svgIconConfig = {
    hamburger : {
        url : sc_static('svg/hamburger.svg'),
        animation : [
            {
                el : 'path:nth-child(1)',
                animProperties : {
                    collapsed : { val : '{"path" : "m 5.0916789,20.818994 53.8166421,0"}' },
                    expanded : { val : '{"path" : "m 5.091679,13.771104 53.816642,0"}' },
                    back: { val : '{"path" : "M 11.895159,32.779898 32.224103,13.350955"}' }
                }
            },
            {
                el : 'path:nth-child(2)',
                animProperties : {
                    collapsed : { val : '{"path" : "m 5.1969746,31.909063 53.8166424,0"}' },
                    expanded : { val : '{"path" : "m 5.1969746,31.909063 53.8166424,0"}' },
                    back: { val : '{"path" : "m 12.609724,31.909 41.174552,0"}' }
                }
            },
            {
                el : 'path:nth-child(3)',
                animProperties : {
                    collapsed : { val : '{"path" : "m 5.0916788,42.95698 53.8166422,0"}' },
                    expanded : { val : '{"path" : "m 5.0916789,50.00487 53.8166421,0"}' },
                    back: { val : '{"path" : "M 11.895161,31.043526 32.224103,50.472468"}'}
                }
            }
        ]
    }
};