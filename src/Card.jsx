import { Link } from 'react-router-dom';
import "./Card.css";
import { formatDistanceToNow } from 'date-fns';

const Card = ({ id, created_at, title, content, likes }) => {
    const timeAgo = formatDistanceToNow(new Date(created_at), { addSuffix: true });

    return (
        <div className="cards-container">
            <Link to={`/posts/${id}`} className="card-link">
                <h2 className="title">{title}</h2>
                <h3 className="created_at">Posted: {timeAgo}</h3>
                <p className="content">{content}</p>
                <p>❤️ {likes} ❤️</p>
            </Link>
        </div>
    );
};

export default Card;

