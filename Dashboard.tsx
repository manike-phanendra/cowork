import { Layout } from '@/components/layout/Layout';
import { Card, CardTitle } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useWorkspace } from '@/context/WorkspaceContext';
import { FileText, Clock, CheckCircle, PenTool, TrendingUp, AlertCircle, ArrowRight, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from '@/utils/dateUtils';

export default function Dashboard() {
  const { documents, approvalSteps, signatures, activities } = useWorkspace();

  const stats = {
    total: documents.length,
    pending: documents.filter((d) => d.status === 'pending_approval' || d.status === 'pending_review').length,
    approved: documents.filter((d) => d.status === 'approved').length,
    signed: documents.filter((d) => d.status === 'signed').length,
    totalValue: documents.reduce((sum, d) => sum + (d.value || 0), 0),
    pendingValue: documents.filter((d) => ['pending_approval', 'sent'].includes(d.status)).reduce((sum, d) => sum + (d.value || 0), 0)
  };

  const pendingApprovals = approvalSteps.filter((a) => a.status === 'pending');
  const pendingSignatures = signatures.filter((s) => s.status === 'pending');
  const recentDocuments = [...documents].sort((a, b) =>
  new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  ).slice(0, 5);

  return (
    <Layout title="Dashboard" subtitle="Welcome back! Here's what's happening with your documents.">
      {/* Stats Grid */}
      <div data-ev-id="ev_6543618b31" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="flex items-center gap-4">
          <div data-ev-id="ev_81d8a64a3e" className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div data-ev-id="ev_7e1b03cd9f">
            <p data-ev-id="ev_981a1f12a8" className="text-2xl font-bold text-text">{stats.total}</p>
            <p data-ev-id="ev_47f549758c" className="text-sm text-text-secondary">Total Documents</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div data-ev-id="ev_89704eed6a" className="w-12 h-12 bg-warning-light rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6 text-warning" />
          </div>
          <div data-ev-id="ev_ddfdefbe30">
            <p data-ev-id="ev_037e9fe00f" className="text-2xl font-bold text-text">{stats.pending}</p>
            <p data-ev-id="ev_e62307e5dc" className="text-sm text-text-secondary">Pending Review</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div data-ev-id="ev_4a766bc89f" className="w-12 h-12 bg-success-light rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-success" />
          </div>
          <div data-ev-id="ev_61fbd805df">
            <p data-ev-id="ev_77423dda89" className="text-2xl font-bold text-text">{stats.approved}</p>
            <p data-ev-id="ev_bee400f38b" className="text-sm text-text-secondary">Approved</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div data-ev-id="ev_e34ed9621b" className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center">
            <PenTool className="w-6 h-6 text-[#8B5CF6]" />
          </div>
          <div data-ev-id="ev_492735decc">
            <p data-ev-id="ev_12d64254fd" className="text-2xl font-bold text-text">{stats.signed}</p>
            <p data-ev-id="ev_957ffd1ae1" className="text-sm text-text-secondary">Signed</p>
          </div>
        </Card>
      </div>

      {/* Value Stats */}
      <div data-ev-id="ev_390e127199" className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-primary to-primary-hover text-white">
          <div data-ev-id="ev_3c962b75ad" className="flex items-center justify-between">
            <div data-ev-id="ev_4f7292cecc">
              <p data-ev-id="ev_54615e1002" className="text-white/80 text-sm">Total Pipeline Value</p>
              <p data-ev-id="ev_9b80210e53" className="text-3xl font-bold mt-1">${stats.totalValue.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-white/30" />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-success to-emerald-600 text-white">
          <div data-ev-id="ev_2e47eb78f5" className="flex items-center justify-between">
            <div data-ev-id="ev_9ce07a4116">
              <p data-ev-id="ev_1843acf395" className="text-white/80 text-sm">Pending Closure</p>
              <p data-ev-id="ev_bd57d73b23" className="text-3xl font-bold mt-1">${stats.pendingValue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-10 h-10 text-white/30" />
          </div>
        </Card>
      </div>

      <div data-ev-id="ev_d48911fa23" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Documents */}
        <div data-ev-id="ev_10f509639b" className="lg:col-span-2">
          <Card padding="none">
            <div data-ev-id="ev_e24475ac41" className="px-5 py-4 border-b border-border flex items-center justify-between">
              <CardTitle>Recent Documents</CardTitle>
              <Link to="/documents" className="text-sm text-primary hover:text-primary-hover font-medium flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div data-ev-id="ev_65e725a78d" className="divide-y divide-border">
              {recentDocuments.map((doc) =>
              <Link
                key={doc.id}
                to={`/documents/${doc.id}`}
                className="flex items-center gap-4 px-5 py-4 hover:bg-background/50 transition-colors">

                  <div data-ev-id="ev_a04180a286" className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                doc.type === 'proposal' ? 'bg-primary-light' :
                doc.type === 'contract' ? 'bg-success-light' :
                doc.type === 'quotation' ? 'bg-warning-light' : 'bg-info-light'}`
                }>
                    <FileText className={`w-5 h-5 ${
                  doc.type === 'proposal' ? 'text-primary' :
                  doc.type === 'contract' ? 'text-success' :
                  doc.type === 'quotation' ? 'text-warning' : 'text-info'}`
                  } />
                  </div>
                  <div data-ev-id="ev_7b44fa6dc4" className="flex-1 min-w-0">
                    <p data-ev-id="ev_fbdf133da1" className="font-medium text-text truncate">{doc.title}</p>
                    <p data-ev-id="ev_080571814a" className="text-sm text-text-secondary">{doc.clientName}</p>
                  </div>
                  <div data-ev-id="ev_c9d991ede0" className="text-right">
                    <StatusBadge status={doc.status} size="sm" />
                    <p data-ev-id="ev_bd4e24d7f8" className="text-xs text-text-muted mt-1">
                      {formatDistanceToNow(doc.updatedAt)}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </Card>
        </div>

        {/* Action Items */}
        <div data-ev-id="ev_89808ed96d" className="flex flex-col gap-6">
          {/* Pending Approvals */}
          <Card padding="none">
            <div data-ev-id="ev_2e8a32f6f1" className="px-5 py-4 border-b border-border flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                Pending Approvals
              </CardTitle>
              <span data-ev-id="ev_de29d06484" className="text-sm font-medium text-warning">{pendingApprovals.length}</span>
            </div>
            <div data-ev-id="ev_7bf9c17f0b" className="p-4">
              {pendingApprovals.length === 0 ?
              <p data-ev-id="ev_8534c68149" className="text-sm text-text-muted text-center py-4">No pending approvals</p> :

              <div data-ev-id="ev_4f44f7a694" className="flex flex-col gap-3">
                  {pendingApprovals.slice(0, 3).map((approval) => {
                  const doc = documents.find((d) => d.id === approval.documentId);
                  return doc ?
                  <Link
                    key={approval.id}
                    to={`/documents/${doc.id}`}
                    className="p-3 bg-background rounded-lg hover:bg-background/80 transition-colors">

                        <p data-ev-id="ev_0fc3bc17cb" className="text-sm font-medium text-text truncate">{doc.title}</p>
                        <p data-ev-id="ev_686a384e47" className="text-xs text-text-muted mt-1">Waiting for your approval</p>
                      </Link> :
                  null;
                })}
                </div>
              }
            </div>
          </Card>

          {/* Pending Signatures */}
          <Card padding="none">
            <div data-ev-id="ev_0f43277256" className="px-5 py-4 border-b border-border flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <PenTool className="w-5 h-5 text-primary" />
                Awaiting Signatures
              </CardTitle>
              <span data-ev-id="ev_6528701d4d" className="text-sm font-medium text-primary">{pendingSignatures.length}</span>
            </div>
            <div data-ev-id="ev_6094ce49ba" className="p-4">
              {pendingSignatures.length === 0 ?
              <p data-ev-id="ev_91e67d12b5" className="text-sm text-text-muted text-center py-4">No pending signatures</p> :

              <div data-ev-id="ev_6eb5f87b36" className="flex flex-col gap-3">
                  {pendingSignatures.slice(0, 3).map((sig) => {
                  const doc = documents.find((d) => d.id === sig.documentId);
                  return doc ?
                  <Link
                    key={sig.id}
                    to={`/signatures`}
                    className="p-3 bg-background rounded-lg hover:bg-background/80 transition-colors">

                        <p data-ev-id="ev_4c4fa68c09" className="text-sm font-medium text-text truncate">{doc.title}</p>
                        <p data-ev-id="ev_38968ea3d6" className="text-xs text-text-muted mt-1">Awaiting: {sig.signerName}</p>
                      </Link> :
                  null;
                })}
                </div>
              }
            </div>
          </Card>

          {/* Recent Activity */}
          <Card padding="none">
            <div data-ev-id="ev_0151ab95da" className="px-5 py-4 border-b border-border">
              <CardTitle>Recent Activity</CardTitle>
            </div>
            <div data-ev-id="ev_759fd239b4" className="p-4">
              <div data-ev-id="ev_dc31e7afad" className="flex flex-col gap-3">
                {activities.slice(0, 5).map((activity) =>
                <div data-ev-id="ev_fe84284dd0" key={activity.id} className="flex items-start gap-3">
                    <img data-ev-id="ev_dbd2a4d3e2"
                  src={activity.user.avatar}
                  alt={activity.user.name}
                  className="w-8 h-8 rounded-full" />

                    <div data-ev-id="ev_2266102094" className="flex-1 min-w-0">
                      <p data-ev-id="ev_e7c899627a" className="text-sm text-text">
                        <span data-ev-id="ev_44afba6dfe" className="font-medium">{activity.user.name}</span>
                        {' '}{activity.description.toLowerCase()}
                      </p>
                      <p data-ev-id="ev_482c36f19b" className="text-xs text-text-muted mt-0.5">
                        {formatDistanceToNow(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>);

}