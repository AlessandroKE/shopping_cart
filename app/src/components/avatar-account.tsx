import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function Profile() {
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p className="text-lg font-medium">Welcome, ${`username`}</p>
    </div>
  );
}
