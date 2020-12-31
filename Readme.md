## Background

CamHelp is a simple Camera app written in React Native. It is aimed to make it easier for people with tremors to take sharper pictures by simply providing them with a few improvements:

- All pictures are taken with a 5-second timer
- Taking a picture actually takes 3 pictures after which they can choose which one to save

See the Play Store for more information: https://play.google.com/store/apps/details?id=com.zenzizenzi.camhelp

## Development

I made this app to help my grandfather so development is geared towards his experience. If you find this useful to yourself or someone you know and would like to see a feature added or improved then definitely feel free to drop a note.

Currently it is only available on Android as I don't have a need (yet) to release on iOS. If anyone wants it on their iPhone then let me know.

## Contributing

Contributions are welcome, though keep them relevant: feature improvements are welcome but stylistic code changes aren't.
To get started you just need to clone the repo and run `yarn go` -- that's it.

I have set up an elaborate Github Actions pipeline which allows me to just merge any PR and a new version will automatically become available on the Play Store. All you need to do is make sure the CHANGELOG is updated, no other non-feature changes are required on your side.

### I want to contribute a translation

Wonderful! All you need to do is make your changes to the https://github.com/Vannevelj/camhelp/blob/master/src/translations.json file and send a PR in.
