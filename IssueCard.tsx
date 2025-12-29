import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { UpvoteIcon, CommentIcon, ShareIcon } from '../icons/DashboardIcons';

export interface Issue {
  id: string;
  title: string;
  description: string;
  image: string | null;
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Escalated';
  upvotes: number;
  comments: number;
  reporter: {
      name: string;
      avatar: string;
  };
  date: string;
  severity: 'Low' | 'Medium' | 'High';
  category: string;
  escalated?: boolean;
}

interface IssueCardProps {
  issue: Issue;
  onSelect: (issue: Issue) => void;
}

const statusClasses = {
  Pending: 'bg-red-500/20 text-red-400',
  'In Progress': 'bg-yellow-500/20 text-yellow-400',
  Resolved: 'bg-green-500/20 text-green-400',
  Escalated: 'bg-orange-500/20 text-orange-400',
};

const IssueCard: React.FC<IssueCardProps> = ({ issue, onSelect }) => {
  const [currentUpvotes, setCurrentUpvotes] = useState(issue.upvotes);
  const [isVoted, setIsVoted] = useState(false);

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isVoted) {
      setCurrentUpvotes(currentUpvotes - 1);
      setIsVoted(false);
    } else {
      setCurrentUpvotes(currentUpvotes + 1);
      setIsVoted(true);
    }
  };

  return (
    <Card className="flex flex-col" padding="p-0">
      <img 
        src={issue.image || `https://placehold.co/600x400/0b1020/4a5568?text=No+Image`} 
        alt={issue.title}
        className="w-full h-40 object-cover rounded-t-2xl" 
      />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-lg">{issue.title}</h4>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full mt-1 inline-block flex-shrink-0 ${statusClasses[issue.status]}`}>{issue.status}</span>
        </div>
        
        <p className="text-gray-300 mt-1 text-sm line-clamp-2 flex-grow">{issue.description}</p>
        
        <div className="flex items-center gap-2 mt-4">
            <img src={issue.reporter.avatar} alt={issue.reporter.name} className="w-6 h-6 rounded-full"/>
            <p className="text-sm text-gray-400">
                by {issue.reporter.name} - <span className="italic">{issue.date}</span>
            </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between p-4 border-t border-white/10">
          <div className="flex items-center gap-4">
             <button 
                onClick={handleUpvote}
                className={`flex items-center gap-2 text-gray-300 hover:text-white transition-colors group ${isVoted ? 'text-purple-400' : ''}`}
                aria-label="Upvote issue"
              >
                <UpvoteIcon className={`w-5 h-5 transition-transform ${isVoted ? 'scale-125 text-purple-400' : 'group-hover:scale-110'}`} />
                <span className="font-bold text-sm">{currentUpvotes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <CommentIcon className="w-5 h-5" />
                  <span className="font-bold text-sm">{issue.comments}</span>
              </button>
               <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <ShareIcon className="w-5 h-5" />
              </button>
          </div>
          <Button onClick={() => onSelect(issue)} variant="secondary" className="!px-3 !py-1.5 text-sm">View Details</Button>
      </div>
    </Card>
  );
};

export default IssueCard;
