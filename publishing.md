**To automate the process of publishing your use-dark-mode-react-hook package to npm using GitHub Actions, you'll need to set up a workflow that handles the build process and npm publishing. Below are the steps to create this GitHub Actions workflow:**

## 1. Create a Personal Access Token (PAT) for npm
Before you can publish your package, you need to create an npm token:

- Go to the npm website.
- Log in to your account.
- Navigate to your account settings and select "Tokens."
- Click on "Generate New Token" and choose a "Read and Publish" token.
- Copy the token.



## 2. Add the npm Token to GitHub Secrets
- Go to your GitHub repository.
- Click on "Settings" > "Secrets and variables" > "Actions."
- Click on "New repository secret."
- Name the secret NPM_TOKEN.
- Paste the npm token into the value field and save.


## 3. Create & Initialize your project

### 3.1 Create a New Project Directory
``` bash
mkdir my-project
cd my-project
```

### 3.2 Initialize the Project
This will create a `package.json` file with default settings.
``` bash
npm init -y
```

### 3.3  Set Up TypeScript (Optional)
``` bash
npm install typescript --save-dev
npx tsc --init
```

#### 3.3.1 Add the below script to your `package.json`
``` bash
...

"scripts": {
    "build": "tsc"
  },

...
```


#### 3.3.2 Update the `tsconfig.json` File
Open `tsconfig.json` and make sure it's configured to include your src directory. Here’s an example configuration:

```json
{
  "compilerOptions": {
    "outDir": "./dist",         // Redirect output structure to the 'dist' directory
    "module": "commonjs",       // Specify module code generation
    "target": "es5",            // Specify ECMAScript target version
    "jsx": "react",             // Support JSX in .tsx files
    "strict": true,             // Enable all strict type-checking options
    "esModuleInterop": true,    // Enables emit interoperability between CommonJS and ES Modules
    "skipLibCheck": true        // Skip type checking of all declaration files
  },
  "include": ["src/**/*"],      // Include all files in 'src' directory
  "exclude": ["node_modules", "dist"] // Exclude 'node_modules' and 'dist'
}
```

### 3.4 Add your source code
Create a src directory and add source
``` bash
mkdir src
```

### 3.5 Compile TypeScript to JavaScript (if using TypeScript)
``` bash
npx tsc
```

### 3.6 Create an Entry Point
Ensure your `package.json` points to the correct entry file
``` bash
"main": "dist/index.js",
"types": "dist/index.d.ts",
```
**If you're not using TypeScript, point "main" to your JavaScript file directly.**


## 4. Set Up the GitHub Actions Workflow
- Create a GitHub Actions workflow file in your repository to automate the build and publish process.
- In your repository, create a .github/workflows directory if it doesn’t already exist.
- Inside the workflows directory, create a file named publish.yml.
Here’s an example of what your publish.yml might look like:

```yaml
name: Publish to npm

on:
  push:
    branches:
      - main
      - master
    
    # Trigger only if there's a change in the src folder or package files
    paths:
      - 'src/**'
      - 'package.json'
      - 'tsconfig.json'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        cache: 'npm'

    - name: Install dependencies
      run: npm install

    - name: Build the package
      run: npm run build

    - name: Publish to npm
      run: npm publish --access public
      env:
        NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```



## 4. Explanation of the Workflow
**name:** Publish to npm: This is the name of your workflow.

**on:** push: The workflow triggers on push events to the main or master branch, but only if there are changes in the src folder, package.json, or tsconfig.json.

**jobs:** build: The job runs on an ubuntu-latest virtual environment.

**steps:**
- **Checkout code:** Uses the actions/checkout action to clone your repository.
- **Setup Node.js:** Uses actions/setup-node to set up Node.js version 20.
- **Install dependencies:** Installs the dependencies using npm install.
- **Build the package:** Runs the build command (npm run build) to compile the TypeScript files.
- **Publish to npm:** Publishes the package to npm using the npm publish command.
- The **`NODE_AUTH_TOKEN`** environment variable is set to the value of the NPM_TOKEN secret.



## 5. Commit and Push the Workflow
Commit the publish.yml file to your repository:

```bash
git add .github/workflows/publish.yml
git commit -m "Add GitHub Actions workflow to publish to npm"
git push origin main
```



## 6. Triggering the Workflow Manually
If you want to manually trigger the workflow (for example, if no code has changed but you want to republish), you can modify the workflow to allow for manual triggers:

Add the following to your on block in publish.yml:
```yaml
on:
  push:
    branches:
      - main
      - master

    # Trigger only if there's a change in the src folder or package files
    paths:
      - 'src/**'
      - 'package.json'
      - 'tsconfig.json'
   
   # This allows manual triggering (workflow should be present on default branch)
   workflow_dispatch:
```

With this setup, your package will be automatically built and published to npm whenever you push changes to your repository's main or master branch.