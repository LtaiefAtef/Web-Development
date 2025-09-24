import { findClubWithId, findUserWithId } from "@/lib/DATA_OPS";

export default async function ClubDetails({ searchParams }) {
    const config = await searchParams;
    const userInfo = await findUserWithId(config.author_id);
    const club_info = await findClubWithId(config.club_id);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="club-details-container">
            <div className="club-header">
                <h1 className="club-title">{club_info.stmt.club_name}</h1>
                <div className="club-meta">
                    <span className="creation-date">
                        Created on {formatDate(club_info.stmt.creation_date)}
                    </span>
                </div>
                <button className="join-button">Join Club</button>
            </div>

            <div className="club-content">
                <div className="description-section">
                    <h2>About the Club</h2>
                    <p className="club-description">
                        {club_info.stmt.description || 'No description provided.'}
                    </p>
                </div>

                <div className="author-section">
                    <h2>Club President</h2>
                    <div className="author-card">
                        <div className="author-avatar">
                            {club_info.stmt.author_name.toUpperCase().split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="author-info">
                            <h3>{club_info.stmt.author_name}</h3>
                            <p className="author-rank">{userInfo.userInfo.rank}</p>
                            <p className="author-contact">
                                <span>{userInfo.userInfo.email}</span>
                                <span>{userInfo.userInfo.phone}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="members-section">
                    <h2>Members</h2>
                    <div className="members-list">
                        {club_info.stmt.member_list ? (
                            <div className="members-grid">
                                <p>Members will be displayed here</p>
                            </div>
                        ) : (
                            <p className="no-members">No members have joined yet.</p>
                        )}
                    </div>
                </div>

                <div className="events-section">
                    <h2>Upcoming Events</h2>
                    <div className="events-list">
                        {club_info.stmt.event_list ? (
                            <div className="events-grid">
                                <p>Events will be displayed here</p>
                            </div>
                        ) : (
                            <p className="no-events">No upcoming events scheduled.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
