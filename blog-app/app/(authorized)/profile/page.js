import UserProfileNav from "@/components/user-profile-nav";
import UserTabs from "@/components/user-tabs";
export default function ProfilePage({searchParams}) {

    return (
        <div className="profile_page">
            <div className="profile">
                <UserProfileNav/>
                <UserTabs searchParams={searchParams}/>
            </div>
        </div>
    );
}