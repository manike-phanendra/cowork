/**
 * ⚠️ ROUTING RULES:
 * - ALL routes defined here via <Routes> + <Route>
 * - NO <BrowserRouter> here (it's in main.tsx)
 * - NO useRoutes() hook
 * - Static imports only - no React.lazy()
 */
import { Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Documents from '@/pages/Documents';
import DocumentDetail from '@/pages/DocumentDetail';
import NewDocument from '@/pages/NewDocument';
import Templates from '@/pages/Templates';
import Approvals from '@/pages/Approvals';
import Signatures from '@/pages/Signatures';
import Clients from '@/pages/Clients';
import Billings from '@/pages/Billings';
import Settings from '@/pages/Settings';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/documents/new" element={<NewDocument />} />
      <Route path="/documents/:id" element={<DocumentDetail />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/approvals" element={<Approvals />} />
      <Route path="/signatures" element={<Signatures />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/billings" element={<Billings />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
