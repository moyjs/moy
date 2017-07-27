import babel from "rollup-plugin-babel";
import multidest from "rollup-plugin-multidest";
import nodeResolve from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";
import license from "rollup-plugin-license";
// import package from './package.json';

export default {
    entry: "src/index.js",
    dest: `dist/moy.js`,
    format: "iife",
    moduleName: "Moy",
    plugins: [
        license({
            banner: `<%= pkg.name %> v<%= pkg.version %>
                    <%= pkg.description %>
                    author : <%= pkg.author %>
                    homepage : <%= pkg.homepage %>
                    bugs : <%= pkg.bugs.url %>`,
        }),
        nodeResolve(),
        multidest([
            {
                dest: `dist/moy.min.js`,
                format: "iife",
                moduleName: "Moy",
                plugins: [uglify()]
            }
        ]),
        babel({
            // exclude: "node_modules/**" // only transpile our source code
        })
    ]
};
