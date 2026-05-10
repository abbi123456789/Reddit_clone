import { panelClass } from "../../styles/theme"

export default function RecentPosts (){
    return (
        <div className={`${panelClass} flex flex-1 flex-col gap-4`}>
            <p className="font-bold">Recent Posts</p>
        </div>
    )
}
