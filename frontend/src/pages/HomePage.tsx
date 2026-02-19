import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const HomePage = ()=>{
    return (
        <main className="home-container">
            <Navbar />
            <div className="main-content">
                <Sidebar />
            </div>
        </main>
    )
}

export default HomePage