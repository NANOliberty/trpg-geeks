import { useState } from 'react'
import Link from 'next/link'
import { Menu, Bell, Settings, Plus, X } from 'lucide-react'
import { Button } from '../ui/Button'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* 로고 */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <img
                  className="h-8 w-auto"
                  src="/logo-placeholder.png"
                  alt="TRPG Logo"
                />
              </Link>
            </div>
            
            {/* 네비게이션 메뉴 */}
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/sessions" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Session
              </Link>
              <Link href="/characters" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Character
              </Link>
              <Link href="/helper" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Help
              </Link>
            </nav>
          </div>

          {/* 우측 메뉴 */}
          <div className="flex items-center">
            <Button
              variant="primary"
              size="sm"
              className="mr-4"
            >
              <Plus className="h-4 w-4 mr-1" />
              새 세션
            </Button>

            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-5 w-5" />
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
