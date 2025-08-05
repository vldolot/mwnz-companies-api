import { XMLParser } from 'fast-xml-parser';
import type { CompanyXMLData } from '../types/company.types';

export class XMLParserUtil {
  private parser: XMLParser;

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      parseAttributeValue: true,
      trimValues: true,
    });
  }

  parseCompanyXML(xml: string): CompanyXMLData {
    try {
      const parsed = this.parser.parse(xml);
      
      if (!parsed?.Data) {
        throw new Error('Invalid XML structure: missing `Data` element');
      }

      return parsed as CompanyXMLData;
    } catch (error) {
      throw new Error(`XML parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const xmlParser = new XMLParserUtil();