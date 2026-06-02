import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { Document, Template, Comment, ApprovalStep, Signature, Activity, DocumentStatus, User } from '@/types';

import { api } from '@/utils/apiClient';
import {
  documents as initialDocs,
  templates as initialTemplates,
  comments as initialComments,
  approvalSteps as initialApprovals,
  signatures as initialSignatures,
  activities as initialActivities,
  currentUser as initialUser,
  users as allUsers
} from '@/data/mockData';



interface WorkspaceContextType {
  currentUser: User;
  users: User[];
  switchUser: (userId: string) => void;
  documents: Document[];
  templates: Template[];
  comments: Comment[];
  approvalSteps: ApprovalStep[];
  signatures: Signature[];
  activities: Activity[];
  addDocument: (doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt' | 'currentVersion' | 'createdBy'>) => Document;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  updateDocumentStatus: (id: string, status: DocumentStatus) => void;
  addComment: (comment: Omit<Comment, 'id' | 'createdAt' | 'author'>) => void;
  resolveComment: (id: string) => void;
  updateApprovalStep: (id: string, status: 'approved' | 'rejected', comments?: string) => void;
  addSignature: (sig: Omit<Signature, 'id'>) => void;
  signDocument: (signatureId: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const [documents, setDocuments] = useState<Document[]>(initialDocs);
  const [templates] = useState<Template[]>(initialTemplates);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [approvalSteps, setApprovalSteps] = useState<ApprovalStep[]>(initialApprovals);
  const [signatures, setSignatures] = useState<Signature[]>(initialSignatures);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const switchUser = useCallback((userId: string) => {
    const user = allUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const addActivity = useCallback((documentId: string, action: string, description: string) => {
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      documentId,
      action,
      description,
      user: currentUser,
      timestamp: new Date().toISOString()
    };
    setActivities(prev => [newActivity, ...prev]);
  }, [currentUser]);

  const addDocument = useCallback((doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt' | 'currentVersion' | 'createdBy'>): Document => {
    const newDoc: Document = {
      ...doc,
      id: `doc-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentVersion: 1,
      createdBy: currentUser
    };
    setDocuments(prev => [newDoc, ...prev]);
    addActivity(newDoc.id, 'created', 'Document created');
    return newDoc;
  }, [addActivity]);

  const updateDocument = useCallback((id: string, updates: Partial<Document>) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, ...updates, updatedAt: new Date().toISOString() } : doc
    ));
    addActivity(id, 'edited', 'Document updated');
  }, [addActivity]);

  const deleteDocument = useCallback((id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  }, []);

  const updateDocumentStatus = useCallback((id: string, status: DocumentStatus) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, status, updatedAt: new Date().toISOString() } : doc
    ));
    addActivity(id, 'status_changed', `Status changed to ${status.replace('_', ' ')}`);
  }, [addActivity]);

  const addComment = useCallback((comment: Omit<Comment, 'id' | 'createdAt' | 'author'>) => {
    const newComment: Comment = {
      ...comment,
      id: `cmt-${Date.now()}`,
      createdAt: new Date().toISOString(),
      author: currentUser
    };
    setComments(prev => [...prev, newComment]);
    addActivity(comment.documentId, 'commented', 'Added a comment');
  }, [addActivity]);

  const resolveComment = useCallback((id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, resolved: true } : c));
  }, []);

  const updateApprovalStep = useCallback((id: string, status: 'approved' | 'rejected', stepComments?: string) => {
    setApprovalSteps(prev => prev.map(step => 
      step.id === id ? { ...step, status, comments: stepComments, decidedAt: new Date().toISOString() } : step
    ));
    const step = approvalSteps.find(s => s.id === id);
    if (step) {
      addActivity(step.documentId, status, `${status === 'approved' ? 'Approved' : 'Rejected'} by ${step.approverName}`);
    }
  }, [approvalSteps, addActivity]);

  const addSignature = useCallback((sig: Omit<Signature, 'id'>) => {
    const newSig: Signature = { ...sig, id: `sig-${Date.now()}` };
    setSignatures(prev => [...prev, newSig]);
  }, []);

  const signDocument = useCallback((signatureId: string) => {
    setSignatures(prev => prev.map(sig => 
      sig.id === signatureId ? { ...sig, status: 'signed', signedAt: new Date().toISOString() } : sig
    ));
    const sig = signatures.find(s => s.id === signatureId);
    if (sig) {
      addActivity(sig.documentId, 'signed', `Signed by ${sig.signerName}`);
    }
  }, [signatures, addActivity]);

  return (
    <WorkspaceContext.Provider value={{
      currentUser,
      users: allUsers,
      switchUser,
      documents,
      templates,
      comments,
      approvalSteps,
      signatures,
      activities,
      addDocument,
      updateDocument,
      deleteDocument,
      updateDocumentStatus,
      addComment,
      resolveComment,
      updateApprovalStep,
      addSignature,
      signDocument
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error('useWorkspace must be used within WorkspaceProvider');
  return context;
}
