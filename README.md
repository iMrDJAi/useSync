***
# **useSync** - Custom React Hook
[![npm](https://img.shields.io/npm/v/usesync?color=red)](https://www.npmjs.com/package/usesync)

A custom React hook to synchronize and share public state across different components on your React project.
***

## Table of Contents
-   [Installation](#installation)
-   [Usage](#usage)
-   [Notes](#notes)
-   [License](#license)

## Installation:

Install the hook from **npm**:
```bash
$ npm install usesync --save
```

Then simply require it:
```js
const { useSync, sync, storage } = require("usesync")
```
or
```js
import useSync, { sync, storage } from "usesync"
```

## Usage:
### useSync(id: string)

This is the hook that you will use across your React components, the function registers them under a specific ID you will give:
```js
const Component = () => {
    useSync('hello')
    return (
        <div>
            Hello World!
        </div>
    )
}
```

To synchronize multiple components simply call the hook inside them and give the same ID:
```js
const ComponentA = () => {
    useSync('hello')
    return (
        <div>
            Hello World! (A)
        </div>
    )
}
const ComponentB = () => {
    useSync('hello')
    return (
        <div>
            Hello World! (B)
        </div>
    )
}
```

You can use the hook on a component for multiple times with multiple IDs:
```js
const Component = () => {
    useSync('id num 1')
    useSync('id num 2')
    return (
        <div>
            Hello World!
        </div>
    )
}
```

**Note:** it is possible to dynamically update a hook ID on a component with no issue.

### sync(id: string)

The hook alone does nothing, to synchronize components registered under a specific ID you need to call this function, it causes to re-render all of them, here is an example:
```js
import React from 'react'
import ReactDOM from 'react-dom'
import useSync, { sync } from "usesync"

const ComponentA = () => {
    useSync('Components')
    return (
        <div>
            Random Number (A): {Math.random()}
        </div>
    )
}
const ComponentB = () => {
    useSync('Components')
    useSync('ComponentB')
    return (
        <div>
            Random Number (B): {Math.random()}
        </div>
    )
}
const ComponentC = () => {
    useSync('Components')
    return (
        <div>
            Random Number (C): {Math.random()}
        </div>
    )
}
const App = () => {
    const handleClick = () => {
        sync('Components')
    }
    const handleClick2 = () => {
        sync('ComponentB')
    }
    return (
        <div>
            <ComponentA />
            <ComponentB />
            <ComponentC />
            <ComponentC />
            <button onClick={handleClick}>re-render all</button>
            <button onClick={handleClick2}>re-render component b</button>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
```
Try it on [CodePen](https://codepen.io/imrdjai/pen/zYKQzqw)!

### storage: object

This is just an extra object publicly available across your app can be used to store data, you can put states for your componenets there, here is an example:
```js
import React from 'react'
import ReactDOM from 'react-dom'
import useSync, { sync, storage } from "usesync"

storage.randomNumber = Math.random()

const ComponentA = () => {
    useSync('Components')
    return (
        <div>
            Random Number (A): {storage.randomNumber}
        </div>
    )
}
const ComponentB = () => {
    useSync('Components')
    useSync('ComponentB')
    return (
        <div>
            Random Number (B): {storage.randomNumber}
        </div>
    )
}
const ComponentC = () => {
    useSync('Components')
    return (
        <div>
            Random Number (C): {storage.randomNumber}
        </div>
    )
}
const App = () => {
    const handleClick = () => {
        storage.randomNumber = Math.random()
        sync('Components')
    }
    const handleClick2 = () => {
        storage.randomNumber = Math.random()
        sync('ComponentB')
    }
    return (
        <div>
            <ComponentA />
            <ComponentB />
            <ComponentC />
            <ComponentC />
            <button onClick={handleClick}>re-render all</button>
            <button onClick={handleClick2}>re-render component b</button>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
```
Try it on [CodePen](https://codepen.io/imrdjai/pen/XWjwqxO)!

## Notes
Give this cool project a star ⭐! I will appreciate it ❤

[![GitHub Repo stars](https://img.shields.io/github/stars/iMrDJAi/useSync?style=social)](https://github.com/iMrDJAi/useSync)

## License
[MIT](https://github.com/iMrDJAi/useSync/blob/master/LICENSE) © [iMrDJAi](https://github.com/iMrDJAi)