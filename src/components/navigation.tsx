import { BadgeTurkishLira, Building2, LayoutDashboard, NotebookText, Users } from "lucide-react";

export const Nav_Items = [
    {
        name: 'Anasayfa',
        href: '/',
        icon: LayoutDashboard, 
    },
    {
        name: 'İşler',
        href: '/isler',
        icon: NotebookText,
    },
    {
        name: 'Markalar',
        href: '/markalar',
        icon: Building2,
    },
    {
        name: 'Finans',
        href: '/finans',
        icon: BadgeTurkishLira,
    },
    {
        name: 'Ekip',
        href: '/ekip',
        icon: Users,
    }
]