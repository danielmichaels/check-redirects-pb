interface SocialNavItem {
    name: string;
    href: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

