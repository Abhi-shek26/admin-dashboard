import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import AdminLayout from '@/components/layout/AdminLayout';
import KpiCard from '@/components/dashboard/KpiCard';
import CvAnalysisChart from '@/components/charts/CvAnalysisChart';
import TopUsersTable from '@/components/dashboard/TopUsersTable';
import CountryDistributionChart from '@/components/charts/CountryDistributionChart';
import PaidVsFreeChart from '@/components/charts/PaidVsFreeChart';
import CareerStageChart from '@/components/charts/CareereStageChart';
import { Users, FileText, Star } from 'lucide-react';
import SatisfactionChart from '@/components/charts/SatisfactionChart';
import { MessageSquare } from 'lucide-react';

// Defining types for the data we are fetching
type KpiData = { totalUsers: number; feedbackCount: number; averageCvScore: string; averageFeedbackRating: string; };
type ChartData = { name: string; value: number }[];
type TopUserData = { name: string; email: string; averageScore: number; analysisCount: number }[];
type CvTrendData = { date: string; count: number }[];

type DashboardPageProps = {
  kpis?: KpiData; 
  userDemographics?: ChartData;
  paidVsFree?: ChartData;
  careerStages?: ChartData;
  cvTrends?: CvTrendData;
  topUsers?: TopUserData;
  error?: string; 
  satisfactionData: ChartData;
  ratingDistribution: ChartData;
};

// Helper component for chart styling
const ChartContainer = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h3 className="mb-4 text-lg font-semibold text-gray-800">{title}</h3>
    {children}
  </div>
);

export default function DashboardPage({
  kpis,
  userDemographics,
  paidVsFree,
  careerStages,
  cvTrends,
  topUsers,
  satisfactionData,
  ratingDistribution,
  error,
}: DashboardPageProps) {

  if (error || !kpis || !userDemographics || !paidVsFree || !careerStages || !cvTrends || !topUsers) {
    return (
      <AdminLayout>
        <div className="text-center p-10 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <h2 className="text-2xl font-bold">Failed to Load Dashboard Data</h2>
          <p className="mt-2">There was an error fetching the analytics data. Please check the server logs for more details.</p>
          {error && <p className="mt-4 font-mono bg-red-200 p-2 rounded">Error details: {error}</p>}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* KPI Section */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total Users" value={kpis.totalUsers} icon={<Users />} />
        <KpiCard title="Total Feedback" value={kpis.feedbackCount} icon={<FileText />} />
        <KpiCard title="Avg. CV Score" value={kpis.averageCvScore} icon={<Star />} />
        <KpiCard title="Avg. Feedback Rating" value={kpis.averageFeedbackRating + " / 5"} icon={<MessageSquare />} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-2">
        <ChartContainer title="User Demographics (Country)">
          <CountryDistributionChart data={userDemographics} />
        </ChartContainer>
        <ChartContainer title="Paid vs. Free Users">
          <PaidVsFreeChart data={paidVsFree} />
        </ChartContainer>
        <ChartContainer title="Career Stage Breakdown">
          <CareerStageChart data={careerStages} />
        </ChartContainer>
        <ChartContainer title="CV Analysis Usage Trends">
          <CvAnalysisChart data={cvTrends} />
        </ChartContainer>
        <ChartContainer title="Feedback Satisfaction Breakdown">
          <SatisfactionChart data={satisfactionData} />
        </ChartContainer>
        <ChartContainer title="Feedback Rating Distribution">
           <CareerStageChart data={ratingDistribution} /> 
        </ChartContainer>
      </div>
      
      {/* Leaderboard Section */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Top CV Scorers</h3>
        <TopUsersTable users={topUsers} />
      </div>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { destination: '/admin/login', permanent: false } };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const apiEndpoints = [
      'kpis', 
      'userDemographics', 
      'paidVsFree', 
      'careerStages', 
      'cvAnalysisUsage', 
      'topUsers',
      'satisfaction',
      'feedback'
    ];
    
    const responses = await Promise.all(
      apiEndpoints.map(endpoint => fetch(`${baseUrl}/api/analytics/${endpoint}`))
    );

    for (const res of responses) {
      if (!res.ok) {
        throw new Error(`API request failed for ${res.url} with status ${res.status}`);
      }
    }

    const [kpis, userDemographics, paidVsFree, careerStages, cvTrends, topUsers, satisfactionData, ratingDistribution] = await Promise.all(
      responses.map(res => res.json())
    );

    return {
      props: {
        kpis,
        userDemographics,
        paidVsFree,
        careerStages,
        cvTrends,
        topUsers,
        satisfactionData,
        ratingDistribution,
      },
    };
  } catch (error: any) {
    console.error("CRITICAL ERROR in getServerSideProps:", error.message);
    return {
      props: {
        error: error.message || "An unknown error occurred while fetching data.",
      },
    };
  }
};
