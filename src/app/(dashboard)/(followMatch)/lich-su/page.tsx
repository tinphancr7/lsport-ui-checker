import TabSSR from "@/components/TabComp/TabSSR";
import { paymentTabs } from "@/constants";


function History({
	searchParams,
}: {
	searchParams: {
		tab: string;
	};
}) {
	const tab = searchParams?.tab || "playing";

    return (  
        <>
            <TabSSR 
                tabs={paymentTabs} 
                currentTab={tab}
                variant="underlined"
            />
        </>
    );
}

export default History;