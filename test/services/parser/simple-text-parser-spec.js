import assert from 'assert'

import simpleTextParser from '../../../src/services/parser/simple-text-parser.js'

describe('Simple Text Parser', function () {
 it('should allow setting rules for keys', function () {
    // Arrange
    simpleTextParser["addKey"]("slap", "enter", "press")
    simpleTextParser["addKey"]("zebra", "control+up", "toggle")

    const firstSpeech = { text: "slap" }
    const secondSpeech = { text: "zebraslap"}

    // Act
    const firstParsingTree = simpleTextParser.parse(firstSpeech)
    const secondParsingTree = simpleTextParser.parse(secondSpeech)

    // Assert
    const firstExpectation = [{ type: 'key', value: 'enter', event: "press" }]
    const secondExpectation = [
      { type: 'key', value: 'control+up', event: "toggle" },
      { type: 'key', value: 'enter', event: "press" }
    ]
    assert.deepEqual(firstParsingTree, firstExpectation);
    assert.deepEqual(secondParsingTree, secondExpectation);
  });
})
