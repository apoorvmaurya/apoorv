import Script from "next/script";

export default function StructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Apoorv Maurya",
        url: "https://apoorv-gamma.vercel.app/", // Assuming this is the URL, or placeholder
        jobTitle: "Full Stack Developer",
        sameAs: [
            "https://github.com/apoorvmaurya",
            "https://linkedin.com/in/apoorvmaurya",
            // Add other social links here if available
        ],
        description: "Full Stack Developer | UI/UX Engineer | ML Practitioner",
    };

    return (
        <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
