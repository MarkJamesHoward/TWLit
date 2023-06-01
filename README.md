#Installation
npm i twlit -D


#Usage:

Add to your tooling chain in package.json e.g.
"scripts": {
    "dev" : "twlit -i./tw.css -o ./twlit.js"
}

Can be setup alongside Tailwind as below:
 "scripts": {
    "dev": "concurrently \"tailwindcss -i .\\tailwind\\tailwindlibs.css -o .\\tailwind\\tailwind.css --watch\" \"twlit --input .\\tailwind\\tailwind.css --output .\\tailwind\\twlit.js \" "
  },

#Parameters
--input
This will be the tailwind generated CSS file 

--output
This is the file that we will import into the styles property within your LitElement

LitElement configuration:

We need to import the file produced in the --output using something like

`
import { TWStyles } from "./tailwind/twlit.js";
`

And then include this in the static Styles property:

`
static styles = [css``, TWStyles];
`

