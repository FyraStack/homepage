export type TeamMember = {
	name: string;
	nickname: string | null;
	role: string;
	avatar: string;
};

export const team: (TeamMember | null)[] = [
	{
		name: 'Lleyton Gray',
		nickname: 'Lea',
		role: 'Chief Executive Officer',
		avatar: '/assets/people/lleyton.webp'
	},
 {
		name: 'Katherine Cole',
		nickname: 'Jade',
		role: 'Chief Operating Officer',
		avatar: '/assets/people/kat.webp'
	},
	{
		name: 'Owen Zimmerman',
		nickname: null,
		role: 'Chief Business Officer',
		avatar: '/assets/people/owen.webp'
	},
	{
		name: 'Bill Schouten',
		nickname: null,
		role: 'Director / Business Relations',
		avatar: '/assets/people/bill.png'
  },
  {
		name: 'Addison LeClair',
		nickname: null,
		role: 'Developer Relations Lead',
		avatar: '/assets/people/addison.png'
	},
	{
		name: 'June Fish',
		nickname: null,
		role: 'Director / Software Engineering',
		avatar: '/assets/people/june.webp'
	},
	{
		name: 'Matilde Park',
		nickname: null,
		role: 'Software Engineer',
		avatar: '/assets/people/matilde.webp'
	},
	{
		name: 'Caleb Jones',
		nickname: null,
		role: 'Software Engineer',
		avatar: '/assets/people/caleb.png'
	},
	{
		name: 'Naomi Vel',
		nickname: null,
		role: 'Data Center Engineer',
		avatar: '/assets/people/naomi.jpg'
  },
 	{
		name: 'Jonah',
		nickname: null,
		role: 'Operations Advisor',
		avatar: '/assets/people/jonah.jpg'
  },
  {
    name: 'Cappy Ishihara',
    nickname: null,
    role: 'Software Engineer',
    avatar: 'assets/people/cappy.webp'
  },
  {
    name: 'Willow Reed',
    nickname: 'Cypress',
    role: 'Software Engineer',
    avatar: 'assets/people/willow.webp'
	},
	{
		name: '',
		nickname: null,
		role: '',
		avatar: ''
	}
];
