import UserInfo from "@/components/user-info";
import UserBlogs from "./user-blogs";
import UserSettings from "./user-settings";
import {getUserCookie} from "@/lib/auth";

export default async function UserTabs({ searchParams }) {
    const tab = (await searchParams).current_tab;
    if(!tab || !["user_info","user_settings","user_blogs"].includes(tab)){
        throw new Error("Invalid Url");
    }
    var userId= (await getUserCookie()).user.id;
        switch (tab) {
            case "user_info":
            return <UserInfo userId={userId}/>;
            case "user_settings":
            return <UserSettings userId={userId} />;
            case "user_blogs":
            return <UserBlogs  userId={userId}/>;
        }
}
