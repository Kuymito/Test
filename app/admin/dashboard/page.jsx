import { Suspense } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardSkeleton from './components/DashboardSkeleton';
import DashboardClientContent from './components/DashboardClientContent'; // Import the new client component
import { revalidatePath } from 'next/cache';

// Mock data fetching functions (ideally move to a central file like `@/lib/data`)
const fetchDashboardStats = async () => {
  // Artificial delay removed ,
  // test commit 
  return {
    classAssign: 65,
    expired: 15,
    unassignedClass: 16,
    onlineClass: 28,
  };
};

const fetchChartData = async (timeSlot) => {
  console.log(`Fetching server chart data for: ${timeSlot}`);
  let dataPoints;
  switch (timeSlot) {
    case '07:00 - 10:00': dataPoints = [23, 60, 32, 55, 13, 45, 48]; break;
    case '10:00 - 13:00': dataPoints = [45, 22, 50, 30, 65, 25, 40]; break;
    case '13:00 - 16:00': dataPoints = [30, 55, 18, 48, 33, 60, 22]; break;
    case '16:00 - 19:00': dataPoints = [15, 35, 40, 20, 50, 30, 55]; break;
    default: dataPoints = [10, 20, 30, 40, 50, 60, 70];
  }
  // Artificial delay removed
  return {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: dataPoints,
  };
};

// This is the primary content component, rendered on the server.
async function DashboardContent() {
  // Fetch initial data for the page and the chart in parallel on the server.
  const [dashboardStats, initialChartData] = await Promise.all([
    fetchDashboardStats(), // No longer fetching date/year here
    fetchChartData('07:00 - 10:00')
  ]);

  // Server Action to be called from the client component to get new chart data.
  async function updateChart(timeSlot) {
    'use server'; // This marks the function as a Server Action
    const data = await fetchChartData(timeSlot);
    revalidatePath('/admin/dashboard'); // Optional: revalidate path if data is not mock
    return data;
  }

  return (
    // Pass the fetched stats and the server action to the client component
    <DashboardClientContent
      dashboardStats={dashboardStats}
      initialChartData={initialChartData}
      updateChartAction={updateChart}
    />
  );
}

// The main page export, which uses Suspense for a loading fallback.
export default function AdminDashboardPage() {
    return (
        <DashboardLayout activeItem="dashboard" pageTitle="Dashboard">
            <Suspense fallback={<DashboardSkeleton />}>
                <DashboardContent/>
            </Suspense>
        </DashboardLayout>
    );
}