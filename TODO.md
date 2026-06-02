# TODO - Add MongoDB backend + connect to frontend

- [ ] Create a backend server folder (e.g., `backend/`) with Node.js + Express.
- [ ] Add MongoDB connection using Mongoose.
- [ ] Define Mongoose schemas/models for the main entities used by the frontend (User, Document, Template, Comment, ApprovalStep, Signature, Activity).
- [ ] Implement REST API routes under `/api/*` for CRUD and key actions (add/update/delete document, update status, add/resolve comment, update approval step, add/sign document, list templates).
- [ ] Add seed script to load initial mock data from existing `data/mockData.ts` into MongoDB.
- [ ] Update frontend (`context/WorkspaceContext.tsx`) to fetch data from backend on load.
- [ ] Update frontend mutations (add/update/delete/sign/approve/comment) to call backend endpoints instead of in-memory updates.
- [ ] Add frontend API client (fetch/axios) with environment-based base URL.
- [ ] Add CORS config in backend for local development.
- [ ] Run backend and frontend locally; verify key flows: documents list/detail, document status change, approvals, signatures, comments.
- [ ] Ensure TypeScript types align (create shared DTOs or validate responses).

