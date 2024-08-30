import { ModeToggle } from "@/components/mode-toggle"
import { ProfileDropdown } from "./ProfileDropdown"

export const Navbar = () => {
  return (
    <div className="p-5 flex justify-between">
      <div className="flex gap-4">
        <ModeToggle />
        <p className="font-Quicksand text-4xl">NoCap</p>
      </div>
      <ProfileDropdown />
    </div>
  )
}
