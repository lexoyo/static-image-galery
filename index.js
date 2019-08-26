#!/usr/bin/env node

const PATH = require('path')
const fs = require('fs')
const dirTree = require('directory-tree')

const genThumbnail = require('simple-thumbnail')
const ffmpeg = require('ffmpeg-static')
const resizeOptions = {
	path: ffmpeg.path,
}
const promises = []

// utils
function splitExt(path) {
	const arr = path.split('.')
	const ext = arr.pop()
	return [
		arr.join('.'),
		ext,
	]
}

// parse file system 
const [nodeArg, scriptArg, from, to=from, json=to+'/'+from.split('/').pop()+'.json', small='250x?', big='800x?'] = process.argv

console.log('Generate collection from', from, 'to', to)
const tree = dirTree(process.argv[2], {extensions:/\.(png|jpg)$/}, async (item, PATH, stats) => {
	promises.push(thumbs(item))
})

// generate thumbnail
async function thumbs(image) {
	const [ name, ext ] = splitExt(image.name)
	const smallName = `${ name }_small.${ ext }`
	const bigName = `${ name }_big.${ ext }`
	const smallPath = `${ to }/${ name }_small.${ ext }`
	const bigPath = `${ to }/${ name }_big.${ ext }`
	try {
		await genThumbnail(image.path, smallPath, small, resizeOptions)
		await genThumbnail(image.path, bigPath, big, resizeOptions)
	}
	catch(e) {
		console.error('Error while generating thumbnails', e)
	}
	return {
		...image,
		smallPath: to + '/' + smallName,
		smallName,
		bigPath: to + '/' + bigName,
		bigName,
	}
}

// write the json data
Promise.all(promises)
.then(album => {
	fs.writeFileSync(json, JSON.stringify(album))
	console.log('Done.')
})

