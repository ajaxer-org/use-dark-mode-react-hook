# useDarkMode Hook

A simple React hook to toggle and persist dark mode.

## Installation

```bash
npm install use-dark-mode-react-hook
```

## Usage
```js
import React from 'react';
import useDarkMode from 'use-dark-mode-react-hook';

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div style={{
      backgroundColor: darkMode ? '#333' : '#FFF',
      color: darkMode ? '#FFF' : '#000',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Toggle Dark Mode
      </button>
    </div>
  );
}

export default App;
```

## Publishing

```bash
npx tsc
```

```bash
npm login
```

```bash
npm publish --access public
```

### Test Locally Before Publishing

```bash
npm link
```

```bash
npm link use-dark-mode-react-hook
```

```bash
npm whoami
```

```bash
npm cache clean --force
```

```bash
npm search use-dark-mode-react-hook
```


### Unpublish (If Needed)
If you've identified a mistake in the published package and need to remove it, you can unpublish the package:
```bash
npm unpublish use-dark-mode-react-hook@1.0.0 --force
```
