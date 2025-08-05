
import { describe, it, expect } from 'bun:test';
import { xmlParser } from './xml-parser';

describe('XMLParserUtil', () => {
  it('should parse valid company XML', () => {
    const xml = `
      <Data>
        <name>Test Company</name>
        <description>A test company description.</description>
      </Data>
    `;
    const expected = {
      Data: {
        name: 'Test Company',
        description: 'A test company description.',
      },
    };
    expect(xmlParser.parseCompanyXML(xml)).toEqual(expected);
  });

  it('should throw an error for invalid XML structure', () => {
    const xml = '<invalid></invalid>';
    expect(() => xmlParser.parseCompanyXML(xml)).toThrow('Invalid XML structure: missing `Data` element');
  });
});
