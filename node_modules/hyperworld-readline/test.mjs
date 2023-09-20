#!/usr/bin/env -S node --experimental-modules
import {inspect} from 'util';
import assert from 'assert';
import hyperworldReadline from './index.mjs';
const textString = `create door with inscription "user\ beware: \\"temet nosce meow\\"" --use-arch standard locked -w 10 --leading-to "user profile"`
const {command, argument} = hyperworldReadline(textString);
assert.deepStrictEqual(command, ['create', 'door', 'with', 'inscription', 'user beware: "temet nosce meow"']);
assert.deepStrictEqual(argument, { _: [ 'locked' ], 'use-arch': 'standard', w: 10, 'leading-to': 'user profile' });
