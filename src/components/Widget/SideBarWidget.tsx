
type factsTypes = {
    desc: string;
    id: string
}
function SideBarWidget({ facts }: {facts: factsTypes[]}) {
    return (
        <div className="sidebar-widget">
            <h3 className="widget-title">Fun facts</h3>
            <ul className="trending-list">
                {facts && facts?.map((fact, index) => (
                    <li key={fact?.id} className="trending-item">
                    <span className="trending-number">{index+1}</span>
                    <div className="trending-content">
                        <p>{fact.desc}</p>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default SideBarWidget