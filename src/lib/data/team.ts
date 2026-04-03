export type TeamMember = {
	name: string;
	nickname: string | null;
	role: string;
	avatar: string;
};

export const team: (TeamMember | null)[] = [
	{
		name: 'Katherine Cole',
		nickname: 'Jade',
		role: 'Director / Infrastructure',
		avatar: '/assets/people/kat.webp'
	},
	{
		name: 'Lleyton Gray',
		nickname: 'Lea',
		role: 'Director / Operations',
		avatar: '/assets/people/lleyton.webp'
	},
	{
		name: 'Owen Zimmerman',
		nickname: null,
		role: 'Director / Hardware Engineering',
		avatar: '/assets/people/owen.webp'
	},
	{
		name: 'Bill Schouten',
		nickname: null,
		role: 'Director / Business Relations',
		avatar: '/assets/people/bill.png'
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
		name: '',
		nickname: null,
		role: '',
		avatar: ''
	}
];
