import { error, type RequestHandler } from '@sveltejs/kit';
import { Webhook } from "svix";

export const POST: RequestHandler = ({ request }) => {
	// TODO: implement autumn webhook handler whenever autumn gives us access

	// TODO: verify the webhook is actually from autumn by using svix for signature verification
	//  https://docs.useautumn.com/documentation/webhooks#webhook-security
	//  https://docs.svix.com/receiving/verifying-payloads/how

	return new Response(String('Unimplemented'));
};
