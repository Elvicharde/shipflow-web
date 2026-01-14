import { Avatar, AvatarFallback, AvatarImage } from './avatar';

type userDataProps = {
  username: string;
  img_url?: string | null;
};

export const getInitials = (fullName: string): string => {
  // This function extracts the supplier's initials for invitation preview
  let initials: string = '';
  if (fullName.length < 1 || fullName == undefined) return initials;
  fullName
    .trim()
    .split(' ')
    .map((name) => (initials += name[0].toUpperCase()));
  return initials;
};

export default function UserAvatar({ username, img_url }: userDataProps) {
  return (
    <>
      <Avatar>
        <AvatarImage src={img_url || undefined} />
        <AvatarFallback className="truncate text-sm font-bold leading-[20.3px] text-[#344054]">
          {getInitials(username).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </>
  );
}
