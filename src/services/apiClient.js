import axios from 'axios';

const API_BASE = '/api';

export const apiClient = {
  // 1. Live Gemini AI Generation
  generateAiContent: async (params) => {
    try {
      const res = await axios.post(`${API_BASE}/ai/generate`, params);
      return res.data.data;
    } catch (err) {
      console.error('API generateAiContent error:', err);
      throw err;
    }
  },

  // 2. Posts REST API
  getPosts: async () => {
    try {
      const res = await axios.get(`${API_BASE}/posts`);
      return res.data.data;
    } catch (err) {
      console.error('API getPosts error:', err);
      return [];
    }
  },

  savePost: async (postData) => {
    try {
      const res = await axios.post(`${API_BASE}/posts`, postData);
      return res.data;
    } catch (err) {
      console.error('API savePost error:', err);
      throw err;
    }
  },

  publishPostNow: async (postId) => {
    try {
      const res = await axios.post(`${API_BASE}/posts/${postId}/publish-now`);
      return res.data;
    } catch (err) {
      console.error('API publishPostNow error:', err);
      throw err;
    }
  },

  deletePost: async (postId) => {
    try {
      const res = await axios.delete(`${API_BASE}/posts/${postId}`);
      return res.data;
    } catch (err) {
      console.error('API deletePost error:', err);
      throw err;
    }
  },

  // 3. Leads REST API
  getLeads: async () => {
    try {
      const res = await axios.get(`${API_BASE}/leads`);
      return res.data.data;
    } catch (err) {
      console.error('API getLeads error:', err);
      return [];
    }
  },

  saveLead: async (leadData) => {
    try {
      const res = await axios.post(`${API_BASE}/leads`, leadData);
      return res.data;
    } catch (err) {
      console.error('API saveLead error:', err);
      throw err;
    }
  },

  updateLeadStatus: async (leadId, status, notes) => {
    try {
      const res = await axios.put(`${API_BASE}/leads/${leadId}`, { status, notes });
      return res.data;
    } catch (err) {
      console.error('API updateLeadStatus error:', err);
      throw err;
    }
  },

  // 4. Settings API
  getSettings: async () => {
    try {
      const res = await axios.get(`${API_BASE}/settings`);
      return res.data.data;
    } catch (err) {
      console.error('API getSettings error:', err);
      return {};
    }
  },

  updateSetting: async (key, value) => {
    try {
      const res = await axios.post(`${API_BASE}/settings`, { key, value });
      return res.data;
    } catch (err) {
      console.error('API updateSetting error:', err);
      throw err;
    }
  }
};
