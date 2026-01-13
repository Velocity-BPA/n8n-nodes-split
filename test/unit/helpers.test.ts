/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
  formatKeysArray,
  parseTreatmentDistribution,
  buildExecutionData,
  mergeAdditionalFields,
  formatTags,
  extractValue,
  ensureArray,
  cleanObject,
} from '../../nodes/Split/utils/helpers';

describe('Split Helpers', () => {
  describe('formatKeysArray', () => {
    it('should parse comma-separated keys', () => {
      const result = formatKeysArray('key1, key2, key3');
      expect(result).toEqual(['key1', 'key2', 'key3']);
    });

    it('should handle single key', () => {
      const result = formatKeysArray('singleKey');
      expect(result).toEqual(['singleKey']);
    });

    it('should trim whitespace from keys', () => {
      const result = formatKeysArray('  key1  ,  key2  ');
      expect(result).toEqual(['key1', 'key2']);
    });

    it('should filter empty keys', () => {
      const result = formatKeysArray('key1,,key2,');
      expect(result).toEqual(['key1', 'key2']);
    });
  });

  describe('parseTreatmentDistribution', () => {
    it('should parse treatment:percentage format', () => {
      const result = parseTreatmentDistribution('on:80, off:20');
      expect(result).toEqual([
        { treatment: 'on', size: 80 },
        { treatment: 'off', size: 20 },
      ]);
    });

    it('should handle single treatment', () => {
      const result = parseTreatmentDistribution('control:100');
      expect(result).toEqual([{ treatment: 'control', size: 100 }]);
    });

    it('should trim whitespace', () => {
      const result = parseTreatmentDistribution('  on : 50 ,  off : 50  ');
      expect(result).toEqual([
        { treatment: 'on', size: 50 },
        { treatment: 'off', size: 50 },
      ]);
    });
  });

  describe('buildExecutionData', () => {
    it('should convert single object to execution data array', () => {
      const data = { id: '123', name: 'test' };
      const result = buildExecutionData(data);
      expect(result).toEqual([{ json: data }]);
    });

    it('should convert array to execution data array', () => {
      const data = [
        { id: '1', name: 'first' },
        { id: '2', name: 'second' },
      ];
      const result = buildExecutionData(data);
      expect(result).toEqual([{ json: { id: '1', name: 'first' } }, { json: { id: '2', name: 'second' } }]);
    });

    it('should handle empty array', () => {
      const result = buildExecutionData([]);
      expect(result).toEqual([]);
    });
  });

  describe('mergeAdditionalFields', () => {
    it('should merge additional fields into base object', () => {
      const base = { name: 'test' };
      const additional = { description: 'A test', active: true };
      const result = mergeAdditionalFields(base, additional);
      expect(result).toEqual({
        name: 'test',
        description: 'A test',
        active: true,
      });
    });

    it('should ignore undefined values', () => {
      const base = { name: 'test' };
      const additional = { description: undefined, active: true };
      const result = mergeAdditionalFields(base, additional);
      expect(result).toEqual({
        name: 'test',
        active: true,
      });
    });

    it('should ignore empty strings', () => {
      const base = { name: 'test' };
      const additional = { description: '', active: true };
      const result = mergeAdditionalFields(base, additional);
      expect(result).toEqual({
        name: 'test',
        active: true,
      });
    });
  });

  describe('formatTags', () => {
    it('should parse comma-separated tags into array of objects', () => {
      const result = formatTags('tag1, tag2, tag3');
      expect(result).toEqual([{ name: 'tag1' }, { name: 'tag2' }, { name: 'tag3' }]);
    });

    it('should return empty array for empty string', () => {
      const result = formatTags('');
      expect(result).toEqual([]);
    });

    it('should convert array to array of objects', () => {
      const tags = ['tag1', 'tag2'];
      const result = formatTags(tags);
      expect(result).toEqual([{ name: 'tag1' }, { name: 'tag2' }]);
    });
  });

  describe('extractValue', () => {
    it('should extract nested value using dot notation', () => {
      const obj = { data: { user: { name: 'John' } } };
      const result = extractValue(obj, 'data.user.name');
      expect(result).toBe('John');
    });

    it('should return default value for missing path', () => {
      const obj = { data: {} };
      const result = extractValue(obj, 'data.user.name', 'default');
      expect(result).toBe('default');
    });

    it('should return undefined for missing path without default', () => {
      const obj = { data: {} };
      const result = extractValue(obj, 'data.user.name');
      expect(result).toBeUndefined();
    });
  });

  describe('ensureArray', () => {
    it('should return array unchanged', () => {
      const arr = [1, 2, 3];
      const result = ensureArray(arr);
      expect(result).toEqual(arr);
    });

    it('should wrap non-array in array', () => {
      const result = ensureArray('single');
      expect(result).toEqual(['single']);
    });

    it('should handle undefined', () => {
      const result = ensureArray(undefined);
      expect(result).toEqual([undefined]);
    });
  });

  describe('cleanObject', () => {
    it('should remove undefined values', () => {
      const obj = { a: 1, b: undefined, c: 'test' };
      const result = cleanObject(obj);
      expect(result).toEqual({ a: 1, c: 'test' });
    });

    it('should remove null values', () => {
      const obj = { a: 1, b: null, c: 'test' };
      const result = cleanObject(obj);
      expect(result).toEqual({ a: 1, c: 'test' });
    });

    it('should remove empty strings', () => {
      const obj = { a: 1, b: '', c: 'test' };
      const result = cleanObject(obj);
      expect(result).toEqual({ a: 1, c: 'test' });
    });

    it('should keep false values', () => {
      const obj = { a: false, b: 0, c: 'test' };
      const result = cleanObject(obj);
      expect(result).toEqual({ a: false, b: 0, c: 'test' });
    });
  });
});
