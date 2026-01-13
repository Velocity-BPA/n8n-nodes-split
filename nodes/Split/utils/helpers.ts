/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject, INodeExecutionData } from 'n8n-workflow';

/**
 * Convert string array to Split keys format
 */
export function formatKeysArray(keys: string | string[]): string[] {
  if (typeof keys === 'string') {
    return keys.split(',').map((key) => key.trim()).filter((key) => key.length > 0);
  }
  return keys;
}

/**
 * Parse treatment distribution
 */
export function parseTreatmentDistribution(
  treatmentsInput: string,
): Array<{ treatment: string; size: number }> {
  const treatments = treatmentsInput.split(',').map((t) => t.trim());
  const result: Array<{ treatment: string; size: number }> = [];

  for (const treatment of treatments) {
    const [name, sizeStr] = treatment.split(':').map((s) => s.trim());
    const size = parseInt(sizeStr, 10);
    if (name && !isNaN(size)) {
      result.push({ treatment: name, size });
    }
  }

  return result;
}

/**
 * Build execution data from response
 */
export function buildExecutionData(data: IDataObject | IDataObject[]): INodeExecutionData[] {
  if (Array.isArray(data)) {
    return data.map((item) => ({ json: item }));
  }
  return [{ json: data }];
}

/**
 * Simple object merge for additional fields (filters undefined/null/empty strings)
 */
export function mergeAdditionalFields(
  base: IDataObject,
  additionalFields?: IDataObject,
): IDataObject {
  if (!additionalFields) {
    return base;
  }
  const filtered: IDataObject = {};
  for (const [key, value] of Object.entries(additionalFields)) {
    if (value !== undefined && value !== null && value !== '') {
      filtered[key] = value;
    }
  }
  return { ...base, ...filtered };
}

/**
 * Format tags array
 */
export function formatTags(tags: string | string[]): Array<{ name: string }> {
  const tagList = typeof tags === 'string' ? tags.split(',').map((t) => t.trim()) : tags;
  return tagList.filter((t) => t.length > 0).map((name) => ({ name }));
}

/**
 * Extract value from nested object using dot notation path
 */
export function extractValue<T>(obj: unknown, path: string, defaultValue?: T): T | undefined {
  if (obj === undefined || obj === null) {
    return defaultValue;
  }
  
  const keys = path.split('.');
  let current: unknown = obj;
  
  for (const key of keys) {
    if (current === undefined || current === null || typeof current !== 'object') {
      return defaultValue;
    }
    current = (current as Record<string, unknown>)[key];
  }
  
  if (current === undefined || current === null) {
    return defaultValue;
  }
  
  return current as T;
}

/**
 * Ensure value is array
 */
export function ensureArray<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}

/**
 * Clean undefined properties from object
 */
export function cleanObject(obj: IDataObject): IDataObject {
  const cleaned: IDataObject = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null && value !== '') {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

/**
 * Log licensing notice (once per load)
 */
let licensingNoticeLogged = false;

export function logLicensingNotice(logger: { warn: (message: string) => void }): void {
  if (!licensingNoticeLogged) {
    logger.warn(
      '[Velocity BPA Licensing Notice] ' +
      'This n8n node is licensed under the Business Source License 1.1 (BSL 1.1). ' +
      'Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA. ' +
      'For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.',
    );
    licensingNoticeLogged = true;
  }
}
