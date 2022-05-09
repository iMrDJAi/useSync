***
# **useSync**
[![npm](https://img.shields.io/npm/v/usesync?color=red)](https://www.npmjs.com/package/usesync)

A subscription based state management solution for React!
***

## Table of Contents
-   [Installation](#installation)
-   [Usage](#usage)
-   [Notes](#notes)
-   [License](#license)

## Installation:

Install the package from **npm**:
```bash
$ npm install usesync --save
```

Then simply require it:
```js
const { useSync, sync, storage } = require("usesync") // CJS
```
or
```js
import useSync, { sync, storage } from "usesync" // ESM
```

## Usage:
### useSync(id: string, initialValue?: any): any

This is the hook that you will use across your React components, it allows them to subscribe to a specific sync with the ID you give:
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

Subscribing to muiltiple syncs is possible, just call the hook multiple times with different IDs:
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

Updating sync IDs at runtime is allowed:
```js
const GreetUser = (id) => {
    const user = getUser(id)
    useSync(`Users ${id}`)
    return (
        <div>
            Hello {user.firstName}!
        </div>
    )
}
```

To synchronize state in multiple components simply call the hook inside all of them and give the same ID:
```js
const ComponentA = () => {
    const name = useSync('hello', 'World')
    return (
        <div>
            Hello {name}! (A)
        </div>
    )
}
const ComponentB = () => {
    const name = useSync('hello', 'World')
    return (
        <div>
            Hello {name}! (B)
        </div>
    )
}
```

### sync(id: string, newValue?: any): void

The hook alone does nothing, to dispatch a sync you need to call this function, this will cause all the subscribed components to re-render. Here is an example:
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

**New:** You may pass a sync value to this function, and access it from the subscribed components:
```js
import React from 'react'
import ReactDOM from 'react-dom'
import useSync, { sync } from "usesync"


const initialValue = Math.random()

const ComponentA = () => {
    const randomNumber = useSync('Components', initialValue)
    return (
        <div>
            Random Number (A): {randomNumber}
        </div>
    )
}
const ComponentB = () => {
    const randomNumber = useSync('Components', initialValue)
    return (
        <div>
            Random Number (B): {randomNumber}
        </div>
    )
}
const ComponentC = () => {
    const randomNumber = useSync('Components', initialValue)
    return (
        <div>
            Random Number (C): {randomNumber}
        </div>
    )
}
const App = () => {
    const handleClick = () => {
        sync('Components', Math.random())
    }
    return (
        <div>
            <ComponentA />
            <ComponentB />
            <ComponentC />
            <ComponentC />
            <button onClick={handleClick}>re-render all</button>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
```
Try it on [CodePen](https://codepen.io/imrdjai/pen/WNMwvJx)!

### storage: Object

This is an optional object that is globaly available across your app, it can be used to store states for your componenets. Here is an example:
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
