import React, { useState } from 'react';
import Card from './Card';
import { ViewType } from './Dashboard';
import { UpvoteIcon, CommentIcon } from '../icons/DashboardIcons';

interface ViewInsightsProps {
  setActiveView: (view: ViewType) => void;
}

const initialIssueData = [
    { id: 1, img: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Pothole', category: 'Pothole', desc: 'Large pothole causing traffic issues near downtown.', reporter: 'John D.', date: '2 days ago', status: 'In Progress', upvotes: 128 },
    { id: 2, img: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Garbage', category: 'Garbage', desc: 'Overflowing bins at the city park.', reporter: 'Jane S.', date: '1 day ago', status: 'Pending', upvotes: 95 },
    { id: 3, img: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Lights', category: 'Streetlight', desc: 'Streetlight on 5th Ave is out.', reporter: 'Sam W.', date: '5 days ago', status: 'Resolved', upvotes: 72 },
    { id: 4, img: 'https://via.placeholder.com/150/FFFF00/000000?text=Water', category: 'Water Supply', desc: 'Minor water leakage from a fire hydrant.', reporter: 'Emily B.', date: '3 days ago', status: 'In Progress', upvotes: 54 },
];

// Define a more specific type for the issue, including the new 'voted' property
// FIX: The `interface extends (typeof ...)` syntax is invalid. Replaced it with a `type` alias using a type intersection (&) to correctly extend the inferred type.
type VotableIssue = (typeof initialIssueData[0]) & {
  voted: boolean;
};


const IssueCard: React.FC<{issue: VotableIssue, onUpvote: (id: number) => void}> = ({ issue, onUpvote }) => {
    return (
        <Card title="" className="overflow-hidden">
            <img src={issue.img} alt={issue.category} className="w-full h-40 object-cover" />
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-bold text-lg">{issue.category}</h4>
                        <p className="text-sm text-gray-400">by {issue.reporter} - {issue.date}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full mt-1 inline-block ${issue.status === 'Resolved' ? 'bg-green-500/20 text-green-400' : issue.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>{issue.status}</span>
                </div>
                <p className="text-gray-300 mt-2 text-sm">{issue.desc}</p>
                <div className="flex items-center justify-end gap-4 mt-4 pt-4 border-t border-purple-500/20">
                    <button onClick={() => onUpvote(issue.id)} className={`flex items-center gap-2 text-gray-300 hover:text-white transition-colors group ${issue.voted ? 'text-purple-400' : ''}`}>
                       <UpvoteIcon className={`w-6 h-6 transition-transform ${issue.voted ? 'scale-125' : 'group-hover:scale-110'}`} />
                       <span className="font-bold">{issue.upvotes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                        <CommentIcon className="w-6 h-6" />
                        <span className="font-bold">12</span>
                    </button>
                </div>
            </div>
        </Card>
    )
}

const ViewInsights: React.FC<ViewInsightsProps> = ({ setActiveView }) => {
  const [sort, setSort] = useState('upvoted');
  const [issues, setIssues] = useState<VotableIssue[]>(
      initialIssueData.map(issue => ({...issue, voted: false}))
  );
  
  const handleUpvote = (issueId: number) => {
    setIssues(currentIssues => 
        currentIssues.map(issue => {
            if (issue.id === issueId) {
                const newUpvotes = issue.voted ? issue.upvotes - 1 : issue.upvotes + 1;
                return { ...issue, upvotes: newUpvotes, voted: !issue.voted };
            }
            return issue;
        })
    );
  };
  
  const sortedIssues = [...issues].sort((a, b) => {
      if (sort === 'upvoted') return b.upvotes - a.upvotes;
      
      const getDateValue = (dateStr: string) => {
          const match = dateStr.match(/(\d+)\s+days?\s+ago/);
          return match ? parseInt(match[1], 10) : 999;
      }
      if (sort === 'recent') return getDateValue(a.date) - getDateValue(b.date);

      return 0; // Default case
  });

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Community Insights</h2>
      <p className="text-gray-400 mb-6">View, upvote, and comment on issues reported by the community.</p>

      <Card title="Top 3 Issues in Your Ward">
          <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Potholes on Main Street <span className="text-purple-400 font-semibold">(128 Upvotes)</span></li>
              <li>Garbage Overflow at City Park <span className="text-purple-400 font-semibold">(95 Upvotes)</span></li>
              <li>Streetlight Outages on 5th Ave <span className="text-purple-400 font-semibold">(72 Upvotes)</span></li>
          </ul>
      </Card>
      
      <div className="flex items-center justify-end my-6 gap-4">
          <span className="text-gray-400 font-semibold">Sort by:</span>
          <button onClick={() => setSort('upvoted')} className={`px-4 py-2 rounded-lg ${sort === 'upvoted' ? 'bg-purple-600 text-white' : 'bg-gray-700/50 text-gray-300'} transition-colors`}>Most Upvoted</button>
          <button onClick={() => setSort('recent')} className={`px-4 py-2 rounded-lg ${sort === 'recent' ? 'bg-purple-600 text-white' : 'bg-gray-700/50 text-gray-300'} transition-colors`}>Most Recent</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedIssues.map(issue => <IssueCard key={issue.id} issue={issue} onUpvote={handleUpvote} />)}
      </div>
    </div>
  );
};

export default ViewInsights;
