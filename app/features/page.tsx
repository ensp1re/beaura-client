import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Sparkles, Wand2, Zap, ImageIcon, Palette } from 'lucide-react';
import Link from "next/link";
import SiteHeader from "../components/SiteHeader"
import { SiteFooter } from "../components/SiteFooter";

export const metadata = {
    title: 'Features - BeauraAI',
    description: 'Discover the powerful features of BeauraAI that help you visualize and transform your hairstyle.',
};

const features = [
    {
        icon: Wand2,
        title: "AI-Powered Transformations",
        description: "Our advanced AI algorithms create realistic hairstyle previews in seconds.",
        points: ["Instant style visualization", "Realistic color and texture rendering", "Adapts to your facial features"]
    },
    {
        icon: Palette,
        title: "Extensive Style Library",
        description: "Access thousands of hairstyles and colors to find your perfect look.",
        points: ["Curated collection of trending styles", "Customizable color palettes", "Celebrity-inspired looks"]
    },
    {
        icon: Zap,
        title: "Natural Language Styling",
        description: "Describe your desired look in plain English, and watch it come to life.",
        points: ["Intuitive style descriptions", "AI-powered interpretation", "Refine and adjust with ease"]
    },
    {
        icon: ImageIcon,
        title: "Multi-Angle Views",
        description: "See your new hairstyle from every angle for a complete preview.",
        points: ["360-degree visualization", "Front, side, and back views", "Realistic lighting and shadows"]
    },
    {
        icon: Sparkles,
        title: "Style Recommendations",
        description: "Get personalized hairstyle suggestions based on your preferences and face shape.",
        points: ["AI-powered style matching", "Face shape analysis", "Trend-based suggestions"]
    },
    {
        icon: CheckCircle2,
        title: "Easy Sharing and Saving",
        description: "Save your favorite looks and share them with friends or your stylist.",
        points: ["One-click saving to your account", "Social media sharing integration", "High-resolution exports"]
    }
];

interface FeatureCardProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    points: string[];
}

const FeatureCard = ({ icon: Icon, title, description, points }: FeatureCardProps) => (
    <Card>
        <CardHeader>
            <Icon className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {points.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
        </CardContent>
    </Card>
);

export default function FeaturesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Powerful Features for Your Perfect Look
                                </h1>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Explore the innovative features that make BeauraAI the leading platform for AI-powered hairstyle transformations.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature, index) => (
                                <FeatureCard key={index} {...feature} />
                            ))}
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Ready to Transform Your Look?
                                </h2>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Join thousands of users who have discovered their perfect hairstyle with BeauraAI.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Button asChild>
                                    <Link href="/change-haircut">Try Now</Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/pricing">View Pricing</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
