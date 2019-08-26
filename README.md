# Static image galery

Generate thumbnails and a JSON for folders containing images.

This is useful to me to generate image galeries from photo albums to publish to Jekyll websites.

For now this is a CLI tool.

## Install

```sh
$ npm install -g static-image-galery
```

## How to use it

```sh
$ static-image-galery path/to/image/folder/ path/to/jekyll/_data/
```

Command line arguments:

* `from` folder: folder with your photos
* `to` folder: folder which will receive image thumbnails, default: `from`
* `json` file: path for the generated JSON data file, default: `from`+name of "from" folder
* `small` size, default: "250x?"
* `big` size, default: "800x?"

Example:

```sh
* static-image-galery ~/Downloads/swl_anglet_190820 assets/swl_anglet_190820/ _data/swl_anglet_190820.json
```

