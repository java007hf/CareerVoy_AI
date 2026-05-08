export interface PostData {
  id: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export const posts: PostData[] = [
  {
    id: 1,
    author: {
      name: 'Alice',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    content: 'Just landed a new role as a Product Manager! So excited to start this new journey. Thanks to everyone who supported me. #newbeginnings #productmanagement',
    timestamp: '2h ago',
    likes: 56,
    comments: 12,
  },
  {
    id: 2,
    author: {
      name: 'Bob',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    content: 'Does anyone have tips for preparing for a data science interview? I have one coming up next week and would appreciate any advice!',
    timestamp: '5h ago',
    likes: 102,
    comments: 34,
  },
  {
    id: 3,
    author: {
      name: 'Charlie',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    content: 'Thinking of starting a side hustle with affiliate marketing. It seems like a good way to earn some passive income. Has anyone tried it?',
    timestamp: '1d ago',
    likes: 23,
    comments: 8,
  },
];
