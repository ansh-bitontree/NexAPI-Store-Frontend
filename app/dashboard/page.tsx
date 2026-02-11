import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import ProductsPage from "./products/ProductPage";
export const dynamic = "force-dynamic";

function DashboardPage(){
    return(
        
        <div className= "DashboardPage">
            <div className="DashboardCard">
                <DashboardHeader />
                <ProductsPage />
            </div>
        </div>
        
    );
}
export default DashboardPage;

