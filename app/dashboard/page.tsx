"use client";
import AuthHeader from "@/components/auth/AuthHeader/AuthHeader";


function DashboardPage(){
    return(
        
        <div className= "DashboardPage">
            <div className="DashboardCard">
                <AuthHeader title="Welcome" subtitle="its u r personal DashBoard !!" />
            </div>
        </div>
        
    );
}
export default DashboardPage;

