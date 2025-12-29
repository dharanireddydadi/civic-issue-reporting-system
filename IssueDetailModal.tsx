import React, { useState } from 'react';
import Card from '../common/Card';
import { Issue } from './IssueCard';
import Timeline from './Timeline';
import { UpvoteIcon, CommentIcon, ShareIcon, CloseIcon, SendIcon } from '../icons/DashboardIcons';

interface IssueDetailModalProps {
  issue: Issue;
  onClose: () => void;
}

const statusClasses = {
  Pending: 'bg-red-500/20 text-red-400',
  'In Progress': 'bg-yellow-500/20 text-yellow-400',
  Resolved: 'bg-green-500/20 text-green-400',
};

const IssueDetailModal: React.FC<IssueDetailModalProps> = ({ issue, onClose }) => {
  const [currentUpvotes, setCurrentUpvotes] = useState(issue.upvotes);
  const [isVoted, setIsVoted] = useState(false);
  const [comment, setComment] = useState('');

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
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn p-4"
      onClick={onClose}
    >
      <Card 
        className="w-full max-w-2xl animate-fadeInUp flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        padding="p-0"
      >
        <div className="p-4 flex justify-between items-center border-b border-white/10">
            <h3 className="font-semibold text-gray-200">Details for {issue.id}</h3>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10"><CloseIcon /></button>
        </div>
        
        <div className="flex-grow overflow-y-auto">
            <img 
                src={issue.image || `https://placehold.co/800x400/0b1020/4a5568?text=No+Image`} 
                alt={issue.title}
                className="w-full h-64 object-cover" 
            />

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-bold">{issue.title}</h2>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full mt-1 inline-block flex-shrink-0 ${statusClasses[issue.status]}`}>{issue.status}</span>
                </div>

                <div className="flex items-center gap-3 my-4">
                    <img src={issue.reporter.avatar} alt={issue.reporter.name} className="w-8 h-8 rounded-full"/>
                    <p className="text-gray-400">
                        Reported by <span className="font-semibold text-white">{issue.reporter.name}</span> - <span className="italic">{issue.date}</span>
                    </p>
                </div>
                
                <p className="text-gray-300">{issue.description}</p>
                
                <div className="my-6">
                    <h3 className="font-semibold mb-4">Progress Timeline</h3>
                    <Timeline status={issue.status} />
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                    <h3 className="font-semibold mb-4">Comments ({issue.comments})</h3>
                    {/* Placeholder for actual comments */}
                    <div className="text-center text-gray-500 text-sm py-4">Comment section is under construction.</div>
                    <div className="flex gap-2">
                        <input 
                            type="text"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="Add a public comment..."
                            className="flex-grow p-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                         <button className="p-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50" disabled={!comment.trim()}>
                            <SendIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-white/10 flex-shrink-0">
          <div className="flex items-center gap-6">
             <button 
                onClick={handleUpvote}
                className={`flex items-center gap-2 text-gray-300 hover:text-white transition-colors group ${isVoted ? 'text-purple-400' : ''}`}
                aria-label="Upvote issue"
              >
                <UpvoteIcon className={`w-6 h-6 transition-transform ${isVoted ? 'scale-125 text-purple-400' : 'group-hover:scale-110'}`} />
                <span className="font-bold">{currentUpvotes}</span>
              </button>
              <div className="flex items-center gap-2 text-gray-300">
                  <CommentIcon className="w-6 h-6" />
                  <span className="font-bold">{issue.comments}</span>
              </div>
               <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <ShareIcon className="w-6 h-6" />
                  <span className="font-bold">Share</span>
              </button>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
            Close
          </button>
        </div>
      </Card>
    </div>
  );
};

export default IssueDetailModal;
