import { env } from '../config/env';
import { xmlParser } from '../utils/xml-parser';
import type { Company } from '../types/company.types';

export class CompanyNotFoundError extends Error {
  constructor(id: string) {
    super(`Company with id=${id} not found`);
    this.name = 'CompanyNotFoundError';
  }
}

export class CompanyService {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = env.XML_API_BASE_URL;
    this.timeout = env.REQUEST_TIMEOUT;
  }

  async getCompanyById(id: string): Promise<Company> {
    const url = `${this.baseUrl}/${id}.xml`;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'MWNZCompany-API/1.0',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 404) {
          throw new CompanyNotFoundError(id);
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const xml = await response.text();
      const parsedData = xmlParser.parseCompanyXML(xml);

      return {
        id,
        name: parsedData.Data.name,
        description: parsedData.Data.description,
      };
    } catch (error) {
      if (error instanceof CompanyNotFoundError) {
        throw error;
      }
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }

      throw new Error(`Failed to fetch company: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const companyService = new CompanyService();