'use client'

function SideBarAdsCard() {
    return (
        <div className="sidebar-widget ad-widget">
            <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-XXXXXXXXXX"
                data-ad-slot="XXXXXXXXXX"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({ });
            </script>
        </div>
    )
}

export default SideBarAdsCard