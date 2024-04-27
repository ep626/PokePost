import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./Card.css";
import { supabase } from "./superbaseClient";
import { formatDistanceToNow } from 'date-fns';

const DetailedCard = () => {
    const { id } = useParams();  // Get the post ID from URL parameters
    const [post, setPost] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;

            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching post', error);
                return;
            }

            setPost(data);
            setLikeCount(data.likes);
            fetchComments(); // Fetch comments after fetching the post
        };

        const fetchComments = async () => {
            const { data: commentsData, error: commentsError } = await supabase
                .from('comments')
                .select('*')
                .eq('post_id', id);

            if (commentsError) {
                console.error('Error fetching comments', commentsError);
                return;
            }

            setComments(commentsData);
        };

        fetchPost();
    }, [id]);

    const updateLikes = async () => {
        const newLikeCount = likeCount + 1;
        setLikeCount(newLikeCount);  // Optimistically update the UI

        const { data, error } = await supabase
            .from('posts')
            .update({ likes: newLikeCount })
            .eq('id', id);

        if (error) {
            console.error('Error updating likes:', error);
            setLikeCount(likeCount - 1);  // Revert if there's an error
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;  // Avoid adding empty comments
    
        const { data, error } = await supabase
            .from('comments')
            .insert([{ content: newComment, post_id: id }]);
    
        if (error) {
            console.error('Error adding comment', error);
        } else {
            setNewComment('');  // Clear the input after submitting
            window.location.reload();  // Refresh the page to show all comments including the new one
        }
    };

    if (!post) return <p>Loading...</p>;

    return (
      <div className="card-link">
          <h2 className="title">{post.title}</h2>
          <h3 className="created_at">Posted: {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</h3>
          <h3 className="content">{post.content}</h3>
          {post.image_url && <img src={post.image_url} alt={post.title} className="image" />}          
          <button className="upvote" onClick={updateLikes}>❤️ {likeCount} ❤️</button>
          <Link to={`/editPost/${id}`} className="editButton">Edit</Link>
          <div className="comments-section">
              <h4>Comments</h4>
              {comments.map(comment => (
                  <p key={comment.id}>{comment.content}</p>
              ))}
              <form onSubmit={handleAddComment}>
                  <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button type="submit">Comment</button>
              </form>
          </div>
      </div>
    );
};

export default DetailedCard;
