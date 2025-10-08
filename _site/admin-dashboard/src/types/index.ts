export interface User {
  id: string;
  email: string;
  username: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: 'draft' | 'published' | 'scheduled';
  publishedAt?: string;
  scheduledFor?: string;
  readTime: number;
  image?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface SocialMedia {
  id: string;
  platform: 'twitter' | 'facebook' | 'linkedin' | 'medium';
  connected: boolean;
  accountId?: string;
  accountName?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface PublishQueue {
  id: string;
  articleId: string;
  platforms: string[];
  scheduledAt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  publishedAt?: string;
  errorMessage?: string;
}

export interface Analytics {
  totalUsers: number;
  totalArticles: number;
  totalViews: number;
  publishedThisMonth: number;
  userGrowth: number;
  articleGrowth: number;
  viewGrowth: number;
  recentActivity: Activity[];
}

export interface Activity {
  id: string;
  type: 'article_created' | 'article_published' | 'user_registered' | 'social_connected';
  message: string;
  timestamp: string;
  userId?: string;
  articleId?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}