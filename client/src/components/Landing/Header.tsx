"use client";

import { Bell, Calendar, Stethoscope } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useStore from "@/store/authStore";
import { logoutUser } from "@/api/apiCall";
import { useRouter } from "next/navigation";
import { useToastAlert } from "@/lib/useToastAlert";

interface HeaderProp {
  showDashboardNav?: boolean;
}

interface navItems {
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  active: boolean;
}

const Header: React.FC<HeaderProp> = ({ showDashboardNav }) => {
  const pathname = usePathname();
  const { authenticated, user } = useStore();

  const isAuthenticated:boolean = authenticated;

  const getDashboardData = (): navItems[] => {
    if (user?.role === "doctor") {
      return [
        {
          label: "Dashboard",
          icon: Calendar,
          href: "/doctor/dashboard",
          active: pathname?.includes("/doctor/dashboard") || false,
        },
        {
          label: "Appointments",
          icon: Calendar,
          href: "/doctor/appointments",
          active: pathname?.includes("/doctor/appointments") || false,
        },
      ];
    } else if (user?.role === "patient") {
      return [
        {
          label: "Appointments",
          icon: Calendar,
          href: "/patient/dashboard",
          active: pathname?.includes("/patient/dashboard") || false,
        },
      ];
    }
    return [];
  };
  const router = useRouter();
  const { showToast, Toast } = useToastAlert();

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 md:px-5">
      {Toast}
      <div className="container mx-auto px-4 h-16 flex flex-wrap items-center justify-between">
        {/* left side logo + navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-br from-blue-800 to-blue-700 bg-clip-text text-transparent">
              eDoc+
            </div>
          </Link>

          {/* dashboard navigation */}
          {isAuthenticated && showDashboardNav && (
            <nav className="hidden md:flex items-center md:space-x-6">
              {getDashboardData().map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  className={`flex items-center space-x-1 transition-colors ${
                    item.active
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600 hover:text-blue-700"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* right section */}
        {isAuthenticated && showDashboardNav ? (
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="relative cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 hover:bg-red-600 text-white">
                4
              </Badge>
            </Button>

            {/* dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex gap-4 items-center px-2  transition-colors cursor-pointer"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.profilePic} alt={user?.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  {/* User Info (hidden on small screens) */}
                  <div className="hidden md:block text-left cursor-pointer">
                    <p className="text-sm font-medium text-gray-900 leading-none">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user?.role || "Guest"}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="text-gray-700 font-semibold">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link
                    href={`/${user?.role}/profile`}
                    className="w-full cursor-pointer"
                  >
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href={`/${user?.role}/settings`}
                    className="w-full cursor-pointer"
                  >
                    Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <span
                    onClick={async () => {
                      await logoutUser(router, showToast);
                    }}
                    className="w-full cursor-pointer bg-red-500  text-white hover:bg-red-600"
                  >
                    Logout
                  </span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="text-sm  text-white bg-blue-500 py-2 px-3 mt-1 rounded-md cursor-pointer truncate transition">
                      {user?.email || "Unable to find email"}
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm text-gray-600">
                    This is your registered email address, used for booking and
                    contact.
                  </HoverCardContent>
                </HoverCard>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <span className="block text-sm text-gray-700 font-medium whitespace-nowrap">
                  Welcome ji iiiii,&nbsp;{user?.name}
                </span>
                <Link href={`/${user?.role}/dashboard`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-900 cursor-pointer font-medium hover:text-blue-700"
                  >
                    Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Link href="/login/patient">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-900 cursor-pointer font-medium hover:text-blue-700"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/login/patient" className="hidden md:block">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer bg-gradient-to-br from-blue-600 to-blue-700 text-white font-medium hover:from-blue-700 hover:to-blue-800 hover:text-white rounded-xl px-6"
                  >
                    Book Consultation
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
