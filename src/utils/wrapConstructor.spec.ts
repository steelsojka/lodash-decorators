import { expect } from 'chai';

import { wrapConstructor } from './wrapConstructor';

describe('when wrapping a constructor', () => {
  it('should retain the original name of the constructor', () => {
    class Test {}

    const Wrapper = wrapConstructor(Test, function Blorg() {});

    expect(Wrapper.name).to.equal('Test');
  });
});
