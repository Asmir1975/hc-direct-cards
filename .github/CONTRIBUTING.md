# Contributing

Bug reports should name the card type, card / Home Assistant / integration version,
the appliance model and the expected versus observed behavior. Remove private
diagnostic data. Separate real appliance observations from simulations.

Development uses Node.js 24:

```sh
npm ci
npm test        # unit tests (dev/tests)
npm run build   # type check and bundle into dist/
npm run demo    # offline demo at http://localhost:5173/dev/demo/
```

- Commit the rebuilt `dist/home-connect-direct-cards.js`; CI fails if it differs from a fresh build.
- New features need reliable entity or profile evidence. This package stays with the five supported appliance types.
- Tests should check observable behavior. Keep the license texts in the distributable.
