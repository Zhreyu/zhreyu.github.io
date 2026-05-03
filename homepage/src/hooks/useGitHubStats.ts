import githubStats from '../data/github-stats.json';

interface GitHubStats {
  python: number;
  typescript: number;
  cuda: number;
  java: number;
  javascript: number;
  totalRepos: number;
  contributions: number;
  updatedAt: string;
}

export function useGitHubStats(): GitHubStats {
  return githubStats;
}

export function formatLOC(loc: number): string {
  return loc.toLocaleString();
}
