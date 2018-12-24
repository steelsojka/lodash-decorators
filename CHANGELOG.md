# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="6.0.1"></a>
## [6.0.1](https://github.com/steelsojka/lodash-decorators/compare/v6.0.0...v6.0.1) (2018-12-22)



<a name="6.0.0"></a>
# [6.0.0](https://github.com/steelsojka/lodash-decorators/compare/v5.0.1...v6.0.0) (2018-06-17)


### Bug Fixes

* **bindAll:** fix constructor not being called with new ([4e72d0c](https://github.com/steelsojka/lodash-decorators/commit/4e72d0c))
* **decorators:** don't apply instance decorators when accessing from a ([17caeb6](https://github.com/steelsojka/lodash-decorators/commit/17caeb6))


### BREAKING CHANGES

* **bindAll:** Properties will use the bind decorator to apply getter/setters
on the prototype instead of the instance. This could cause
issues with consumers currently using the implementain that
assigns the bound properties to the instance through the constructor
rather than on the prototype. The value on the prototype will now be
a getter instead of the original function value.



<a name="5.0.1"></a>
## [5.0.1](https://github.com/steelsojka/lodash-decorators/compare/v5.0.0...v5.0.1) (2018-06-02)



<a name="5.0.0"></a>
# [5.0.0](https://github.com/steelsojka/lodash-decorators/compare/v4.5.0...v5.0.0) (2018-03-17)


### Features

* **all:** decorators with optional arguments do not require invocation ([59a71d7](https://github.com/steelsojka/lodash-decorators/commit/59a71d7))
* **all:** initial work for paramless decorators ([5300a2e](https://github.com/steelsojka/lodash-decorators/commit/5300a2e))


### BREAKING CHANGES

* **all:** This may cause issue with tools that rely on static analysis of the
decorators. Since the deocorators are typed with intersections they must
be removed from a static function wrapper.



<a name="4.5.0"></a>
# [4.5.0](https://github.com/steelsojka/lodash-decorators/compare/v4.4.0...v4.5.0) (2017-11-03)


### Bug Fixes

* **BindAll:** Copy original function name to wrapper ([73b8537](https://github.com/steelsojka/lodash-decorators/commit/73b8537))
* **factory:** use barrel files instead of node module resolution ([fda1c73](https://github.com/steelsojka/lodash-decorators/commit/fda1c73))


### Features

* **packages:** update tslib dependency to `^1.7.1` as this is the minimum version required for `typescript` `2.3.3` + ([c8985fb](https://github.com/steelsojka/lodash-decorators/commit/c8985fb))



<a name="4.4.1"></a>
## [4.4.1](https://github.com/steelsojka/lodash-decorators/compare/v4.4.0...v4.4.1) (2017-08-12)


### Bug Fixes

* **factory:** use barrel files instead of node module resolution ([fda1c73](https://github.com/steelsojka/lodash-decorators/commit/fda1c73))



<a name="4.4.0"></a>
# [4.4.0](https://github.com/steelsojka/lodash-decorators/compare/v4.3.5...v4.4.0) (2017-08-06)


### Features

* add support for Angular 2+ in AOT mode ([d0a602d](https://github.com/steelsojka/lodash-decorators/commit/d0a602d))
* inline source code in sourceMaps rather than shipping it ([8e75951](https://github.com/steelsojka/lodash-decorators/commit/8e75951))



<a name="4.3.5"></a>
## [4.3.5](https://github.com/steelsojka/lodash-decorators/compare/v4.3.4...v4.3.5) (2017-06-15)


### Bug Fixes

* **BindAll:** copy over static properties from base constructor ([489aaa4](https://github.com/steelsojka/lodash-decorators/commit/489aaa4))



<a name="4.3.4"></a>
## [4.3.4](https://github.com/steelsojka/lodash-decorators/compare/v4.3.3...v4.3.4) (2017-05-22)


### Bug Fixes

* **sourceMaps:** include src folder in build to not break source maps ([5f2d875](https://github.com/steelsojka/lodash-decorators/commit/5f2d875))



<a name="4.3.3"></a>
## [4.3.3](https://github.com/steelsojka/lodash-decorators/compare/v4.3.2...v4.3.3) (2017-05-19)


### Bug Fixes

* **bindAll:** fix bind all should only apply to methods ([4b86629](https://github.com/steelsojka/lodash-decorators/commit/4b86629))



<a name="4.3.2"></a>
## [4.3.2](https://github.com/steelsojka/lodash-decorators/compare/v4.3.1...v4.3.2) (2017-05-19)


### Bug Fixes

* **bindAll:** guard against getters that aren't functions ([08fa50b](https://github.com/steelsojka/lodash-decorators/commit/08fa50b))



<a name="4.3.1"></a>
## [4.3.1](https://github.com/steelsojka/lodash-decorators/compare/v4.3.0...v4.3.1) (2017-05-06)


### Bug Fixes

* **rearg:** fix typescript build error ([65f8757](https://github.com/steelsojka/lodash-decorators/commit/65f8757))



<a name="4.3.0"></a>
# [4.3.0](https://github.com/steelsojka/lodash-decorators/compare/v4.2.1...v4.3.0) (2017-05-06)


### Features

* **decorators:** negate, flip, rearg can now be used on properties ([6f951dc](https://github.com/steelsojka/lodash-decorators/commit/6f951dc))
