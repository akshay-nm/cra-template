# cra-template

## Highlights

- React app with CSR (create-react-app)
- Helper hooks for HTTP requests, intervals, session management, viewport size
- Redux based session storage
- Redux based notifications
- SWR for data fetching (linked with notifications)
- PWA ready
- Yarn for depedency management
- Prettier for code-formatting (pre-commit hook)
- ESLint scripts for linting and fixing

## Getting started

- Clone this repo or use this repo as a template for your new github project.
- Run `yarn`
- Check `Scripts` section below for scripts

## Enviroment variables

- `REACT_APP_NAME`
- `REACT_APP_API_SERVER_URL`

## Scripts

`start`: `craco start`,
`build`: `craco build`,
`test`: `craco test`,
`pretty`: `prettier --write ./src`,
`lint`: `eslint src --ext .js`,
`lint:fix`: `npm run lint -- --fix`,
`eject`: `react-scripts eject`
