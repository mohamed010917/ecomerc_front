import Month from "./status/Month";
import PaymentSummary from "./status/Stuats";
import Topbrand from "./status/Topbrand";
import Topcatgory from "./status/Topcatgory";
import TopProudect from "./status/TopProudect";
import Toprej from "./status/Toprej";
import TopUser from "./status/TopUser";

export default function Page(){
    return(
        <div className="p-2 flex gap-4 justify-around flex-wrap">
            <PaymentSummary />
            <TopUser />
            <TopProudect />
            <Month />
            <Topcatgory />
            <Topbrand />
            <Toprej />
        </div>
    )
}