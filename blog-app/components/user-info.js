import { GetUserInfo } from "@/lib/DATA_OPS"
export default async function UserInfo({userId}) {
    const userInfo = await GetUserInfo(userId);
    return <article className="user_info">
        <div className="flex_profile">
            <label>Full name</label>
            <p>{userInfo.full_name}</p>
        </div>
        <div className="flex_profile">
            <label>Phone</label>
            <p>{userInfo.phone_number}</p>
        </div>
        <div className="flex_profile">
            <label>Email</label>
            <p>{userInfo.email}</p> 
        </div>                    
        <div className="flex_profile">
            <label>Password</label>
            <p>********</p>
        </div>

    </article>
}