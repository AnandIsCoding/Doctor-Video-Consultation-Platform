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
  const isAuthenticated = false; // Replace with actual authentication logic

  const user = {
    role: "patient",
    name: "Anand Jha",
    profilePic: "",
    email: "anandkumarj669@gmail.com",
  };
  const getDashboardData = (): navItems[] => {
    if (user?.role === "doctor") {
      return [
        {
          label: "Dashbaord",
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
  return (
    <header className="border-b bg-white/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 md:px-5 ">
      <div className="container max-auto px-4 h-16 flex items-center justify-between">
        {/* left side logo + navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold  bg-gradient-to-br from-blue-800 to-blue-700 bg-clip-text text-transparent ">
              Healthcare+
            </div>
          </Link>

          {/* dashboard navigation */}
          {isAuthenticated && showDashboardNav && (
            <nav className="hidden md:flex items-center space-x-6">
              {getDashboardData().map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  className={`flex items-center space-x-1 transition-colors ${
                    item.active
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600 hover:text-blue"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item?.label}</span>
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* right  */}
        {isAuthenticated && showDashboardNav ? (
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="relative cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500  hover:bg-red-600 text-white">
                4
              </Badge>
            </Button>
            {/* dropdown */}
            <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="ghost"
      className="flex gap-4 items-center  px-2 hover:bg-gray-100 transition-colors cursor-pointer"
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
      <Link href={`/${user?.role}/profile`} className="w-full">
        Profile
      </Link>
    </DropdownMenuItem>

    <DropdownMenuItem asChild>
      <Link href={`/${user?.role}/setting`} className="w-full">
        Settings
      </Link>
    </DropdownMenuItem>

    <DropdownMenuSeparator />

    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="text-sm text-center text-blue-600 bg-blue-50 py-2 px-3 mt-1 rounded-md cursor-pointer truncate hover:bg-blue-100 transition">
          {user?.email || "No email available"}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="text-sm text-gray-600">
        This is your registered email address, used for booking and contact.
      </HoverCardContent>
    </HoverCard>
  </DropdownMenuContent>
</DropdownMenu>

          </div>
        ) : (
          <div className="flex items-center space-x-3">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4 ">
                <span className="hidden md:block text-sm text-gray-700 font-medium whitespace-nowrap">
                  Welcome, &nbsp; {user?.name}
                </span>
                <Link href={`${user?.role}/dashboard`}>
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
