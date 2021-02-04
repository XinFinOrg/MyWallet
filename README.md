<img src="./src/assets/images/logo.png" width="300px"/>


Decentralised XDC Wallet for XDC.Network

## Getting started

1. Make sure you have NodeJS newer than version 8, but older than version 12, and NPM version 6 or greater.
2. Open terminal
3. Clone the repo: `git clone git@github.com:MyEtherWallet/MyEtherWallet.git`
4. run `npm i` to install node packages.
5. run `npm run build`. If instructed to edit `package.json` to use newly released versions of dependencies, do so and then run `npm update` and `npm run build` again. After this step succeeds, you can stop and use the offline version by opening the index file from the dist folder with your preferred browser.
6. start with `npm start`. If instructed to edit `package.json` for newly updated dependencies, see previous step.
7. If `npm start` fails and above the error message it states 'new update found' then the package.json version of the indicated packages needs to be updated to match the versions shown in the notice.
npm i copy-webpack-plugin@5.1.1
8. App should be running in `https://localhost:8080`

## Developers

1. Open terminal
2. Clone the repo: `git clone git@github.com/XinFinOrg/Wallet.git`
3. run `git checkout develop`
4. run `npm i` to install node packages.
* SET NODE_OPTIONS=--max_old_space_size=4096
5. run `npm run build`. You can also use the offline version by opening the index file from the dist folder with your preferred browser
6. start `npm run dev`
7. App should be running in `https://localhost:8080`

Can't start due to an update found:
Update the package in the `package.json` as told by the terminal error you see.
Example error: `new update found print-js 1.0.60 1.0.63 2019-11-15T05:05:52.202Z`

