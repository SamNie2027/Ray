import { userOutput } from "./userOutputDTO";

export type authReturn = {
	token: string;
	// include the user payload when available; keep optional to match current
	// service behaviour (which presently only returns a token in tests)
	user?: userOutput;
}
