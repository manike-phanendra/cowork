import { type ReactNode } from 'react';
import { WorkspaceProvider } from '@/context/WorkspaceContext';

/**
 * ⚠️ App-wide providers. Add new providers here — they'll be available in all routes.
 *
 * The provider stack wraps <BrowserRouter> in main.tsx, so any context here
 * is accessible in every page and component.
 *
 * Stacking order matters:
 *   - Outermost providers initialize first
 *   - Innermost providers can depend on outer ones
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <WorkspaceProvider>
      {children}
    </WorkspaceProvider>
  );
}
