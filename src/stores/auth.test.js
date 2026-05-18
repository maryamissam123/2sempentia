import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from './auth';

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('isAuthenticated returnerer false når user er null', () => {
    // Arrange
    const auth = useAuthStore();
    auth.user = null;

    // Act
    const result = auth.isAuthenticated;

    // Assert
    expect(result).toBe(false);
  });
});