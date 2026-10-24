import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" description="Shree Nath Exports CRM & ERP" />
      <section className="card mt-6">
        <EmptyState
          title="Welcome to your workspace"
          description="Choose a section from the sidebar to get started."
        />
      </section>
    </>
  );
}
