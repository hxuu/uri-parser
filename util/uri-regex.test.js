const {
  uriRegex,
  schemeRegex,
  authorityRegex,
  pathRegex,
  queryRegex,
  fragmentRegex,
} = require('./uri-regex');


describe('URI Regex Tests', () => {
    test('valid URI with scheme and path', () => {
        const uri = 'http://example.com/path';
        expect(uriRegex.test(uri)).toBe(true);
    });

    test('valid URI with query', () => {
        const uri = 'http://example.com/path?query=value';
        expect(uriRegex.test(uri)).toBe(true);
    });

    test('valid URI with fragment', () => {
        const uri = 'http://example.com/path#fragment';
        expect(uriRegex.test(uri)).toBe(true);
    });
});

