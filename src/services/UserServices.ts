import { AuthTokenResponse } from "@supabase/supabase-js";
import clientDB from "@/supabase/clientDB";

const loginUser = async (data: IUserLogin): Promise<AuthTokenResponse> => {
	const result = await clientDB.auth.signInWithPassword({ email: data.email, password: data.password });
	return result;
};

export { loginUser };
