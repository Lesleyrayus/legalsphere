export type Message = {
  from: "me" | "them";
  text: string;
  time: string;
  attachment?: {
    type: "image" | "file";
    url: string;
    name: string;
  };
};


export type ChatUser = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
};

export const chatData: ChatUser[] = [
    {
        id: 'user-1',
        name: 'Michael Scott',
        avatar: 'https://picsum.photos/seed/lawyer1/100/100',
        lastMessage: 'I need to declare bankruptcy.',
        unreadCount: 2,
        messages: [
            { from: 'them', text: 'Hey, I have a quick question about our case.', time: '10:40 AM' },
            { from: 'me', text: 'Of course, how can I help?', time: '10:41 AM' },
            { from: 'them', text: 'I need to declare bankruptcy.', time: '10:42 AM' },
        ],
    },
    {
        id: 'user-2',
        name: 'Dwight Schrute',
        avatar: 'https://picsum.photos/seed/lawyer2/100/100',
        lastMessage: 'Perfect, see you then.',
        unreadCount: 0,
        messages: [
            { from: 'me', text: 'Let\'s meet tomorrow at 10am.', time: 'Yesterday' },
            { from: 'them', text: 'Perfect, see you then.', time: 'Yesterday' },
        ],
    },
    {
        id: 'user-3',
        name: 'Pam Beesly',
        avatar: 'https://picsum.photos/seed/lawyer3/100/100',
        lastMessage: 'Can you send me the documents?',
        unreadCount: 1,
        messages: [
            { from: 'them', text: 'Can you send me the documents?', time: '9:15 AM' },
        ],
    },
    {
        id: 'user-4',
        name: 'Jim Halpert',
        avatar: 'https://picsum.photos/seed/lawyer4/100/100',
        lastMessage: 'Got it, thanks!',
        unreadCount: 0,
        messages: [
            { from: 'me', text: 'Here is the contract draft.', time: 'Yesterday' },
            { from: 'them', text: 'Got it, thanks!', time: 'Yesterday' },
        ],
    },
];
