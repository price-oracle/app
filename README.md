# Price Oracle App

Official app for Price Oracle.

- Production website: https://oracles.rip
- Development website: https://dev.oracles.rip

## Development

To setup the development environment first clone the repo:

```bash
git clone [this repo link] && cd price-ui
```

### Local env

Install dependencies:

```bash
yarn
```

Configure the `.env` variables:

```bash
cp .env.example .env
```

Start the app:

```bash
yarn dev
```

The app should be live at [http://localhost:5173/](http://localhost:5173/)

---

## Production

```
yarn build
yarn preview
```

The app should be live at [http://localhost:4173/](http://localhost:4173/)

---

## Commands

### **Test**

```bash
yarn test
```

Runs all tests in folder `tests/unit`
<br/>

```bash
yarn test:update
```

Update snapshots and runs all tests in folder `tests/unit`
<br/>

```bash
yarn test:e2e
```

Runs all tests in folder `tests/e2e`
<br/>

---

## Licensing

The license for Price Oracle App is the AGPL 3.0 (`AGPL-3.0`), see [`LICENSE`](./LICENSE).
