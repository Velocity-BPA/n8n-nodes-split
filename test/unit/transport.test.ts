/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
  buildPatchOperations,
  parseJsonParameter,
  validateRequiredParams,
} from '../../nodes/Split/transport/splitApiRequest';

describe('Split Transport Utilities', () => {
  describe('buildPatchOperations', () => {
    it('should build replace operation', () => {
      const result = buildPatchOperations('replace', '/name', 'newName');
      expect(result).toEqual([
        {
          op: 'replace',
          path: '/name',
          value: 'newName',
        },
      ]);
    });

    it('should build add operation', () => {
      const result = buildPatchOperations('add', '/tags/-', 'newTag');
      expect(result).toEqual([
        {
          op: 'add',
          path: '/tags/-',
          value: 'newTag',
        },
      ]);
    });

    it('should build remove operation without value', () => {
      const result = buildPatchOperations('remove', '/description');
      expect(result).toEqual([
        {
          op: 'remove',
          path: '/description',
        },
      ]);
    });

    it('should handle object values', () => {
      const value = { treatment: 'on', size: 100 };
      const result = buildPatchOperations('replace', '/defaultRule', value);
      expect(result).toEqual([
        {
          op: 'replace',
          path: '/defaultRule',
          value: { treatment: 'on', size: 100 },
        },
      ]);
    });
  });

  describe('parseJsonParameter', () => {
    it('should parse valid JSON string', () => {
      const result = parseJsonParameter('{"key": "value"}');
      expect(result).toEqual({ key: 'value' });
    });

    it('should return object unchanged', () => {
      const obj = { key: 'value' };
      const result = parseJsonParameter(obj);
      expect(result).toEqual(obj);
    });

    it('should return empty object for empty string', () => {
      const result = parseJsonParameter('');
      expect(result).toEqual({});
    });

    it('should throw error for invalid JSON', () => {
      expect(() => parseJsonParameter('invalid json')).toThrow();
    });

    it('should parse JSON array', () => {
      const result = parseJsonParameter('[1, 2, 3]');
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('validateRequiredParams', () => {
    it('should not throw for valid params', () => {
      const params = { workspaceId: '123', splitName: 'test' };
      expect(() =>
        validateRequiredParams(params, ['workspaceId', 'splitName']),
      ).not.toThrow();
    });

    it('should throw for missing params', () => {
      const params = { workspaceId: '123' };
      expect(() =>
        validateRequiredParams(params, ['workspaceId', 'splitName']),
      ).toThrow(/splitName/);
    });

    it('should throw for empty string params', () => {
      const params = { workspaceId: '123', splitName: '' };
      expect(() =>
        validateRequiredParams(params, ['workspaceId', 'splitName']),
      ).toThrow(/splitName/);
    });

    it('should handle empty required list', () => {
      const params = { workspaceId: '123' };
      expect(() => validateRequiredParams(params, [])).not.toThrow();
    });
  });
});
