import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import DashboardOverview from './pages/DashboardOverview';
import AiContentStudio from './pages/AiContentStudio';
import ContentCalendar from './pages/ContentCalendar';
import LeadsCrm from './pages/LeadsCrm';
import AnalyticsHub from './pages/AnalyticsHub';
import LandingPageGenerator from './pages/LandingPageGenerator';
import SettingsPage from './pages/SettingsPage';
import { INITIAL_POSTS, INITIAL_LEADS, ANALYTICS_SUMMARY } from './data/initialData';
import { apiClient } from './services/apiClient';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [analytics, setAnalytics] = useState(ANALYTICS_SUMMARY);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch real data from SQLite backend on load
  const loadData = async () => {
    try {
      const [fetchedPosts, fetchedLeads] = await Promise.all([
        apiClient.getPosts(),
        apiClient.getLeads()
      ]);
      if (fetchedPosts && fetchedPosts.length > 0) setPosts(fetchedPosts);
      if (fetchedLeads && fetchedLeads.length > 0) setLeads(fetchedLeads);
    } catch (err) {
      console.warn('Backend loading warning:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Add new scheduled post to SQLite
  const handleSchedulePost = async (newPost) => {
    try {
      await apiClient.savePost(newPost);
      await loadData();
      setActiveTab('calendar');
    } catch (err) {
      console.error('Failed to schedule post:', err);
      // Local state fallback
      setPosts([newPost, ...posts]);
      setActiveTab('calendar');
    }
  };

  // Add new lead to SQLite
  const handleAddLead = async (newLead) => {
    try {
      await apiClient.saveLead(newLead);
      await loadData();
    } catch (err) {
      console.error('Failed to save lead:', err);
      setLeads([newLead, ...leads]);
    }
  };

  // Update lead status in SQLite
  const handleUpdateLeadStatus = async (leadId, newStatus) => {
    try {
      await apiClient.updateLeadStatus(leadId, newStatus);
      await loadData();
    } catch (err) {
      setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    }
  };

  const scheduledCount = posts.filter(p => p.status === 'scheduled').length;

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        leadCount={leads.length}
        scheduledCount={scheduledCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <TopNavbar
          onQuickGenerate={() => setActiveTab('ai-studio')}
          onAddLead={() => setActiveTab('leads-crm')}
          onOpenSchedule={() => setActiveTab('calendar')}
        />

        <main className="flex-1 pb-16">
          {activeTab === 'overview' && (
            <DashboardOverview
              analytics={analytics}
              posts={posts}
              leads={leads}
              onNavigateToAi={() => setActiveTab('ai-studio')}
              onNavigateToCalendar={() => setActiveTab('calendar')}
              onNavigateToLeads={() => setActiveTab('leads-crm')}
            />
          )}

          {activeTab === 'ai-studio' && (
            <AiContentStudio
              onSchedulePost={handleSchedulePost}
            />
          )}

          {activeTab === 'calendar' && (
            <ContentCalendar
              posts={posts}
              onAddPost={handleSchedulePost}
              onRefreshPosts={loadData}
            />
          )}

          {activeTab === 'leads-crm' && (
            <LeadsCrm
              leads={leads}
              onAddLead={handleAddLead}
              onUpdateLeadStatus={handleUpdateLeadStatus}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsHub
              analytics={analytics}
            />
          )}

          {activeTab === 'campaigns' && (
            <LandingPageGenerator
              onAddLeadFromLandingPage={handleAddLead}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPage />
          )}
        </main>
      </div>
    </div>
  );
}
